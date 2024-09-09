const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Books = sequelize.define('books', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true, // Definindo como chave primária
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Tornar obrigatório
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false, // Tornar obrigatório
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: true, // Campo opcional
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Campo opcional
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Valor padrão para disponível
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true, // Campo opcional
  }
}, {
  timestamps: false, // Desativar createdAt e updatedAt
  freezeTableName: true, // Garante que o nome da tabela seja exatamente "books"
});

module.exports = Books;