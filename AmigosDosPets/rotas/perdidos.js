const express = require('express');
const router = express.Router();
const animalController = require('../controladores/animalController');

console.log('Rota /perdidos acessada');

// Rota GET para pets perdidos
router.get('/perdidos', (req, res) => {
    // Adapte o caminho do arquivo EJS conforme necessário
    res.render('perdidos', { resultados: [] }); // Resultados iniciais vazios ou conforme a lógica desejada
});

// Rota POST para processar a pesquisa de animais perdidos
router.post('/perdidos', async (req, res) => {
    console.log('Rota POST /perdidos acessada');
    try {
        const filters = req.body; // Obtenha os filtros do corpo da solicitação
        console.log('Filtros Recebidos:', filters);

        // Chame a função de pesquisa no controller
        const resultados = await animalController.searchLostPets(filters);
        console.log('Resultados da Consulta:', resultados); 

        // Adicione este console.log para verificar os detalhes de um animal específico
        console.log('Detalhes do Animal:', resultados.length > 0 ? resultados[0] : 'Nenhum animal encontrado');

        // Renderize os resultados no HTML
        res.render('perdidos', { resultados });
        console.log('Resposta Enviada');
    } catch (error) {
        console.error('Erro ao pesquisar animais perdidos:', error);
        res.status(500).send('Erro ao pesquisar animais perdidos.');
    }
});

module.exports = router;
