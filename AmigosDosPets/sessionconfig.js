// sessionconfig.js
const session = require('express-session');
const expressMySQLSession = require('express-mysql-session');
const MySQLStore = expressMySQLSession(session);

const sessionStore = new MySQLStore({
  /* Configurações do banco de dados */
  host: 'localhost',
  port: 3307, // Porta padrão do MySQL
  user: 'php',
  password: '12345678',
  database: 'amigosdospets',
  // Outras configurações, se necessário
});

module.exports = sessionStore;
