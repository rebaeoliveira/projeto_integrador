const Sequelize = require('sequelize');
const db = require('../models/db'); // Certifique-se de importar a conexão com o banco de dados corretamente

const User = db.define('User', {
    nome: Sequelize.STRING,
    cpf: Sequelize.STRING,
    email: Sequelize.STRING,
    whatsapp: Sequelize.STRING,
    telefone_secundario: Sequelize.STRING,
    endereco: Sequelize.STRING,
    estado: Sequelize.STRING,
    cidade: Sequelize.STRING,
    senha: Sequelize.STRING,
    genero: Sequelize.STRING
});

module.exports = User;
