const express = require('express');
const router = express.Router();
const path = require('path');
const Pet = require('../models/pet');
const requireAuth = require('../middlewares/authMiddleware');

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

// Rota GET para exibir o formulário de cadastro de pet
router.get('/cadastropet', requireAuth, (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'cadastropet.html');
    res.sendFile(filePath);
});

// Rota POST para processar o envio do formulário de cadastro de pet
router.post('/cadastropet', requireAuth, upload.single('foto_pet'), async (req, res) => {
    // Obtenha o ID do usuário autenticado
    const user_id = req.user.id; // Isso pode variar dependendo da sua implementação de autenticação

    // Extraia os dados do formulário do corpo da solicitação
    const {
        nome_pet,
        especie_pet,
        sexo_pet,
        idade_pet,
        porte_pet,
        sobre_pet,
        disponivel_doacao, // Inclua disponivel_doacao
        perdido, // Inclua perdido
    } = req.body;

    // O nome do arquivo é acessado com req.file.filename após o upload
    const foto_pet = req.file.filename;

    try {
        // Agora você pode usar o userId para vincular o pet ao usuário ao inserir no banco de dados
        const pet = await Pet.create({
            nome_pet,
            user_id,
            especie_pet,
            sexo_pet,
            idade_pet,
            porte_pet,
            foto_pet: `image/${foto_pet}`, // Salva o caminho relativo da imagem
            sobre_pet,
            disponivel_doacao,
            perdido,
        });

        console.log('Pet cadastrado com sucesso:', pet.toJSON());
        // Defina uma mensagem de sucesso na sessão
        req.session.successMessage = 'Cadastro do pet realizado com sucesso!';
        // Redirecione o usuário para o dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        res.status(500).send('Erro ao cadastrar pet.'); // Envia uma mensagem de erro com status 500
    }
});

module.exports = router;
