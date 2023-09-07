import express from 'express'
import multer from 'multer'
import { storage } from './multerConfig'
import cors from 'cors'

const upload = multer({ storage: storage });
const app = express();
app.use(cors());

app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (req.file) {
        return res.json(req.file.filename);
      } else {
        res.status(400).send('Nenhum arquivo foi enviado.');
      }
      
});

app.listen(3000);
