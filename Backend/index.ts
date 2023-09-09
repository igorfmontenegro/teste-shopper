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

app.post('/upload', upload.single('arquivo'), async (req, res) => {
    if (req.file) {
      const filePath:string = req.file.path;
      const codesSet = new Set<string>();

      try {
        await new Promise<void>((resolve, reject) => {
          fs.createReadStream(filePath).pipe(csv())
          .on('data', async (data) => { 
          const codeCSV = data.product_code;
          codesSet.add(codeCSV);
      
        // dbConnection.query(
        //   `ALTER TABLE products
        //   ADD COLUMN new_price DECIMAL(9, 2) DEFAULT NULL;`
        // )
      

      try {
        const [existingRecord] = await dbQuery(
          'SELECT * FROM products WHERE code = ?', [codeCSV]
        );

        if (existingRecord && Number.isNaN(!Number(data.product_code)) && Number.isNaN(!Number(data.new_priec))){
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
        resolve();
      }).on('error', (error) => {
        reject(error);
      })
    });

    const codesArray = Array.from(codesSet);

    const resultsSQL = await dbQuery(
      'SELECT * FROM products WHERE code IN (?)', [codesArray]
    );

    resultsSearch = resultsSQL as any[];
    res.json({ success : true, data: resultsSearch });
      } catch (error){
        console.error('Erro no processamento do arquivo CSV: ', error);
        res.status(500).send('Erro no processamento do arquivo CSV');
      }
    } else {
      res.json({ success : true, data: resultsSearch });
    }
  });
      


app.listen(3000);
