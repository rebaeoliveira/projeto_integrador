const Sequelize  = require('sequelize');

const sequelize = new Sequelize("amigosdospets", "php", "12345678", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

sequelize.authenticate()
.then(function(){
    console.log("######### Conexão com banco de dados realizada com sucesso ########");
}).catch(function(){
    console.log("### Erro ao conectar com o banco de dado ###")
});

module.exports = sequelize;