// dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/pet');
const requireAuth = require('../middlewares/authMiddleware');
const qr = require('qrcode'); // Importe a biblioteca QRCode

// Rota GET para o dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    console.log('ID do usuário da sessão:', user_id);

    const user = await User.findByPk(user_id);
    const pets = await Pet.findAll({ where: { user_id: user_id } });

    // Criação de uma lista para armazenar os QR codes
    const qrCodes = [];

    // Iteração sobre os pets para gerar os QR codes
    for (const pet of pets) {
      const qrData = `Nome: ${pet.nome_pet}\nEspécie: ${pet.especie_pet}\nTutor: ${user.nome}\nEmail: ${user.email}\nTelefone: ${user.whatsapp}`;
      // Criação do QR code como uma string de dados
      const qrCode = await qr.toDataURL(qrData);
      qrCodes.push(qrCode);
    }

    // Aqui você pode verificar se há uma mensagem de sucesso na sessão e passá-la para a página
    const successMessage = req.session.successMessage;
    delete req.session.successMessage; // Limpe a mensagem da sessão

    // Renderiza a página do dashboard, passando os pets, QR codes e a mensagem de sucesso como variáveis
    res.render('dashboard', { user, pets, qrCodes, successMessage });
  } catch (error) {
    console.error('Erro ao acessar o dashboard:', error);
    res.status(500).send('Erro ao acessar o dashboard.');
  }
});

router.get('/logout', (req, res) => {
  // Implemente a lógica de logout aqui
  req.session.destroy(err => {
      if (err) {
          console.error('Erro ao encerrar a sessão:', err);
          res.status(500).send('Erro ao encerrar a sessão.');
      } else {
          res.redirect('/'); // Redirecione para a página de home após o logout
      }
  });
});

module.exports = router;
