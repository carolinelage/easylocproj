const Sequelize = require('sequelize');

const conexao = new Sequelize("easylocproj", "root", "", {
  host: 'localhost',
  dialect: 'mysql'
});

conexao.authenticate()
.then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
})
.catch((erro) => {
  console.error('Erro ao conectar com o banco de dados: ', erro);
});

module.exports = conexao;