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
  let faleidResults = [{}] as any;
  let sucessResults = [{}] as any;

    if (req.file) {
      const filePath:string = req.file.path;
      const codesSet = new Set<string>();

      fs.createReadStream(filePath).pipe(csv())
      .on('data', async (data) => { 

        let failedObject = {
          ...data,
          error: []
        };

        let sucessObject = {
          ...data
        };

        const codeCSV = data.product_code;
        const newPrice = data.new_price;
        codesSet.add(codeCSV)

        try {
          if (Number.isNaN(Number(codeCSV)) || Number.isNaN(Number(newPrice))){
             faleidResults = [...faleidResults, failedObject = {
              ...failedObject, 
              error: [0]
            }]
          } 

          if ((codeCSV) === "" || (newPrice) === "" ){
            faleidResults = [...faleidResults, failedObject = {
              ...failedObject, 
              error: [...failedObject.error, 1]
            }]
          } 

          const [existingRecord] = await dbQuery(
            'SELECT * FROM products WHERE code = ?', [codeCSV]
          )
          if (!existingRecord){
            faleidResults = [...faleidResults, failedObject = {
              ...failedObject, 
              error: [...failedObject.error, 2]
            }]
          } if (existingRecord && failedObject.error == "") {
            sucessResults = [...sucessResults, sucessObject]

            dbConnection.query(
              'UPDATE products SET new_price = ? WHERE code = ?',
              [newPrice, codeCSV]
            );
          } 
        } catch (error) {
          console.error('Erro ao inserir registro temporário: ', error);
        }

        console.log(sucessResults)

    }).on('end', () => {
      const sucessArray = Array.from(sucessResults)
      

      res.json(sucessArray)
    })
      
}});

app.get('/upload', (req,res) => {
  if(resultsSearch){
    res.json({success: true, data:resultsSearch}) ;
  } else {
    res.status(404).send('Nenhum resultado da pesquisa disponível.');
  }
})


app.listen(3000);
