const express = require('express');
const router = express.Router();
const animalController = require('../controladores/animalController');

console.log('Rota /adotar acessada');

// Rota GET para adotar
router.get('/adotar', (req, res) => {
    // Adapte o caminho do arquivo EJS conforme necessário
    res.render('adotar', { resultados: [] }); // Resultados iniciais vazios ou conforme a lógica desejada
});

// Rota POST para processar a pesquisa de animais
router.post('/adotar', async (req, res) => {
    console.log('Rota POST /adotar acessada');
    try {
        const filters = req.body; // Obtenha os filtros do corpo da solicitação
        console.log('Filtros Recebidos:', filters);

        // Chame a função de pesquisa no controller
        const resultados = await animalController.searchAnimals(filters);
        console.log('Resultados da Consulta:', resultados); 

        // Renderize os resultados no HTML
        res.render('adotar', { resultados });
        console.log('Resposta Enviada');
    } catch (error) {
        console.error('Erro ao pesquisar animais:', error);
        res.status(500).send('Erro ao pesquisar animais.');
    }
});

module.exports = router;
