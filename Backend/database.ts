import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

// Configuração da conexão
export const dbConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


dbConnection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erro ao recuperar dados:', err);
    } else {
      console.log('Dados recuperados com sucesso:', results);
    }
  });
  

