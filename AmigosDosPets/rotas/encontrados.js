const express = require('express');
const router = express.Router();
const encontradosController = require('../controladores/encontradosController'); // Importe o controlador de pets encontrados

console.log('Rota /encontrados acessada');

// Rota GET para pets encontrados
router.get('/encontrados', (req, res) => {
    // Adapte o caminho do arquivo EJS conforme necessário
    res.render('encontrados', { resultados: [] }); // Resultados iniciais vazios ou conforme a lógica desejada
});

// Rota POST para processar a pesquisa de animais encontrados
router.post('/encontrados', async (req, res) => {
    console.log('Rota POST /encontrados acessada');
    try {
        const filters = req.body; // Obtenha os filtros do corpo da solicitação
        console.log('Filtros Recebidos:', filters);

        // Chame a função de pesquisa no controller de pets encontrados
        const resultados = await encontradosController.searchFoundPets(filters);
        console.log('Resultados da Consulta:', resultados);

        // Adicione este console.log para verificar os detalhes de um animal específico
        console.log('Detalhes do Animal:', resultados.length > 0 ? resultados[0] : 'Nenhum animal encontrado');

        // Renderize os resultados no HTML
        res.render('encontrados', { resultados });
        console.log('Resposta Enviada');
    } catch (error) {
        console.error('Erro ao pesquisar animais encontrados:', error);
        res.status(500).send('Erro ao pesquisar animais encontrados.');
    }
});

module.exports = router;
