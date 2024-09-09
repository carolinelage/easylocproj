const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const BookRentalMode = sequelize.define('book_rental_modes', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Definir como parte da chave primária
  },
  rental_mode_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Definir como parte da chave primária
  },
  price: DataTypes.DECIMAL(8, 2),
}, {
  timestamps: false, // Desativa as colunas createdAt e updatedAt
  freezeTableName: true, 
});

module.exports = BookRentalMode;
