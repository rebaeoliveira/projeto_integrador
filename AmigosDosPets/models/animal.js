const { DataTypes } = require('sequelize');
const db = require('../models/db');
const User = require('./User');

const Animal = db.define('Animal', {
    id_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    especie_pet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sexo_pet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    porte_pet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    disponivel_doacao: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'S',
    },
}, {
    tableName: 'pets',
    timestamps: false,
    attributes: {
        exclude: ['id_pet']
    }

});

Animal.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Animal;
