const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User'); // Importe o modelo User que representa a tabela de usuários


//############ GET E POST PARA CADASTRO DE USUARIO #############

// ROTA GET PARA A PÁGINA DE CADASTRO DE USUARIO
router.get('/cadastrausuario', (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'html', 'cadastrausuario.html');
  res.sendFile(filePath);
});


// ROTA POST PARA A PÁGINA DE CADASTRO DE USUARIO
router.post('/cadastrausuario', (req, res) => {
  const {
      nome,
      cpf,
      email,
      whatsapp,
      telefone_secundario,
      endereco,
      estado,
      cidade,
      senha,
      genero
  } = req.body;

  // Aqui você deve escrever o código para inserir os dados no banco de dados MySQL usando o modelo User

  User.create({
    nome,
    cpf,
    email,
    whatsapp,
    telefone_secundario,
    endereco,
    estado,
    cidade,
    senha,
    genero
  }).then(user => {
      console.log('Usuário cadastrado com sucesso:', user.toJSON());
      res.send('Cadastro realizado com sucesso!'); // Envia uma mensagem de sucesso
  }).catch(err => {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário.'); // Envia uma mensagem de erro com status 500
  });
});

//############ FIM GET E POST PARA CADASTRO DE USUARIO #############


module.exports = router;
