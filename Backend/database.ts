import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

// Configuração da conexão
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erro ao recuperar dados:', err);
    } else {
      console.log('Dados recuperados com sucesso:', results);
    }
  });
  

