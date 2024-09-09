const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RentalMode = sequelize.define('rental_modes', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true, // Definindo como chave primária
  },
  mode_name: {
    type: DataTypes.STRING(50),
    allowNull: false, // Tornar obrigatório
    unique: true, // Definir como único
  }
}, {
  timestamps: false, // Desativar createdAt e updatedAt
  freezeTableName: true, // Garante que o nome da tabela seja exatamente "rental_modes"
});

module.exports = RentalMode;
