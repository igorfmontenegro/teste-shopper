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

app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (req.file) {
      const filePath:string = req.file.path;
      const codesSet = new Set<string>();

      fs.createReadStream(filePath).pipe(csv())
      .on('data', (data) => {
      const codeCSV = data.product_code;
      codesSet.add(codeCSV)
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
              console.log(resultsSQL)
              res.json({success: true, data: resultsSQL})
            }
          }
        )
    });
      } else {
        res.status(400).send('Nenhum arquivo foi enviado.');
      }
});


app.listen(3000);
