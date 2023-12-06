const Sequelize = require('sequelize');
const db = require('../models/db'); // Certifique-se de importar a conexão com o banco de dados corretamente

const Pet = db.define('Pet', {
    id_pet: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_pet: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    especie_pet: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    sexo_pet: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    idade_pet: {
        type: Sequelize.STRING(50)
    },
    porte_pet: {
        type: Sequelize.STRING(50)
    },
    foto_pet: {
        type: Sequelize.STRING, // Caminho relativo da imagem
        allowNull: false
    },
    sobre_pet: {
        type: Sequelize.TEXT
    },
    data_criacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    data_atualizacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    disponivel_doacao: {
        type: Sequelize.STRING, // Tipo booleano para indicar se o pet está disponível para doação
        defaultValue: 'N', // Padrão para "não disponível para doação"
    },
    perdido: {
        type: Sequelize.STRING, // Tipo booleano para indicar se o pet está perdido
        defaultValue: 'N', // Padrão para "não perdido"
    }
}, {
    timestamps: false, // Isso desativa a criação automática de colunas de data de criação e atualização
});

module.exports = Pet;
