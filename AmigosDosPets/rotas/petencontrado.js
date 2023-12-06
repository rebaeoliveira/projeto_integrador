const express = require('express');
const router = express.Router();
const path = require('path');
const Petencontrado = require('../models/petencontrado'); // Importe o modelo Petencontrado
const requireAuth = require('../middlewares/authMiddleware'); // Importe o middleware de autenticação

// Multer é uma biblioteca para lidar com uploads de arquivos
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define a pasta onde as imagens serão armazenadas
        cb(null, 'public/image');
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo com um timestamp para evitar colisões de nomes
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Rota GET para exibir o formulário de cadastro de pet encontrado
router.get('/petencontrado', requireAuth, (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'petencontrado.html');
    res.sendFile(filePath);
});

// Rota POST para processar o envio do formulário de cadastro de pet encontrado
router.post('/petencontrado', requireAuth, upload.single('foto_encontrado'), async (req, res) => {
    // Obtenha o ID do usuário autenticado
    const user_id = req.user.id; // Isso pode variar dependendo da sua implementação de autenticação

    // Extraia os dados do formulário do corpo da solicitação
    const {
        especie_encontrado,
        data_encontrado,
        cidade_encontrado,
        local_encontrado,
        detalhes_encontrado,
        // O campo "situacao_encontrado" já é definido como "S" automaticamente
    } = req.body;

    // O nome do arquivo é acessado com req.file.filename após o upload
    const foto_encontrado = req.file.filename;

    try {
        // Agora você pode usar o userId para vincular o pet encontrado ao usuário ao inserir no banco de dados
        const petencontrado = await Petencontrado.create({
            especie_encontrado,
            user_id,
            data_encontrado,
            cidade_encontrado,
            local_encontrado,
            detalhes_encontrado,
            foto_encontrado: `image/${foto_encontrado}`, // Salva o caminho relativo da imagem
            situacao_encontrado: 'S', // Define a situação como "S" (Sim)
        });

        console.log('Pet encontrado cadastrado com sucesso:', petencontrado.toJSON());
        // Defina uma mensagem de sucesso na sessão
        req.session.successMessage = 'Cadastro do pet encontrado realizado com sucesso!';
        // Redirecione o usuário para a página inicial ou para onde desejar
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao cadastrar pet encontrado:', error);
        res.status(500).send('Erro ao cadastrar pet encontrado.'); // Envia uma mensagem de erro com status 500
    }
});

module.exports = router;
