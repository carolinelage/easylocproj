const express = require('express');
const app = express();

const db = require('./db');
const cors = require('cors');

const booksRouter = require('./routes/books'); // Importe o roteador


app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('Página inicial!');
});

app.use('/books', booksRouter); 

app.listen(8080, () => {
  console.log('Servidor backend rodadando em http://localhost:8080');  
});