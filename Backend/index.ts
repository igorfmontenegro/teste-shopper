import express from 'express'
import multer from 'multer'
import fs from 'fs'
import csv from 'csv-parser'
import cors from 'cors'
import { dbConnection } from './database'


import { storage } from './multerConfig'

const upload = multer({ storage: storage });
const app = express();
app.use(cors());

let resultsSearch: any | null = null;

async function dbQuery(sql: string, values: any []){
  return new Promise<any[]>((resolve, reject) => {
    dbConnection.query(sql,values, (error, results) => {
      if(error){
        reject(error);
      } else {
        resolve(Array.isArray(results) ? results : []);
      }
    })
  })
}

app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (req.file) {
      const filePath:string = req.file.path;
      const codesSet = new Set<string>();

      fs.createReadStream(filePath).pipe(csv())
      .on('data', async (data) => {
      const codeCSV = data.product_code;
      codesSet.add(codeCSV)

        dbConnection.query(
          `ALTER TABLE products
          ADD COLUMN new_price DECIMAL(9, 2) DEFAULT NULL;`
        )
      

      try {
        const [existingRecord] = await dbQuery(
          'SELECT * FROM products WHERE code = ?', [codeCSV]
        );

        if (existingRecord){
          await dbQuery(
            'UPDATE products SET new_price = ? WHERE code = ?',
            [data.new_price, codeCSV]
          );
        }
      } catch (error) {
        console.error('Erro ao inserir registro temporário: ', error);
      }
    })
      .on('end', () => {
        const codesArray = Array.from(codesSet);
      
        dbConnection.query(
          'SELECT * FROM products WHERE code IN (?)', [codesArray],
          (err, resultsSQL) => {
            if(err){
              console.error('Erro ao consultar o banco de dados: ', err);
              res.status(500).send('Erro ao consultar o banco de dados');
            } else {
              resultsSearch = resultsSQL as any []
              res.json({success: true, data: resultsSearch})
            }
          }
        )
    });
      } else {
        res.status(400).send('Nenhum arquivo foi enviado.');
      }
});

app.get('/upload', (req,res) => {
  if(resultsSearch){
    res.json({success: true, data:resultsSearch}) ;
  } else {
    res.status(404).send('Nenhum resultado da pesquisa disponível.');
  }
})


app.listen(3000);
