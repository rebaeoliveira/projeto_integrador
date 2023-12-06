const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe o modelo User que representa a tabela de usuários

// Rota GET para a página de login
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza a página de login (você pode usar um mecanismo de modelo como o EJS)
});

// Rota POST para lidar com o processo de login
router.post('/login', (req, res) => {
    const { cpf, senha } = req.body;

    // Verifique as credenciais no banco de dados
    User.findOne({ where: { cpf: cpf } }).then(user => {
        if (!user || user.senha !== senha) {
            // Credenciais incorretas
            res.status(401).render('login', { error: 'Credenciais incorretas' });
        } else {
            // Login bem-sucedido, inicie a sessão
            req.session.user_id = user.id;
            console.log('Sessão do usuário criada com sucesso:', req.session.user_id);

            // Redirecione para a página do painel após o login
            res.redirect('/dashboard');
        }
    }).catch(err => {
        console.error('Erro ao fazer login:', err);
        res.status(500).render('login', { error: 'Erro ao fazer login' });
    });
});

module.exports = router;


