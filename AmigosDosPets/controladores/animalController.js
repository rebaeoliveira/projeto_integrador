// animalController.js

const Animal = require('../models/animal'); // Importe o modelo do Animal
const User = require('../models/User');

// Função para realizar a pesquisa de animais com base nos filtros
async function searchAnimals(filters) {
    try {
        const { especie, sexo, porte } = filters;

        // Construa a consulta com base nos filtros
        const where = {
            disponivel_doacao: 'S', // Apenas animais com campo "disponivel_doacao" igual a "S" (disponível para adoção)
        };

        if (especie) where.especie_pet = especie;
        if (sexo) where.sexo_pet = sexo;
        if (porte) where.porte_pet = porte;

        console.log('Filtros:', filters); // Adicione este log para verificar os filtros recebidos

        // Realize a consulta no banco de dados
        const resultados = await Animal.findAll({
            where,
            include: {
                model: User,
                attributes: ['nome', 'email', 'whatsapp'],
                where: {
                    // Adicione quaisquer condições adicionais para filtrar usuários, se necessário
                },
            },
        });

        console.log('Resultados da consulta:', resultados); // Adicione este log para verificar os resultados da consulta

        return resultados;
    } catch (error) {
        console.error('Erro ao pesquisar animais:', error);
        throw error;
    }
}

// Função para realizar a pesquisa de animais perdidos com base nos filtros
async function searchLostPets(filters) {
    try {
        // Implemente a lógica para a busca de animais perdidos com base nos filtros necessários
        // Certifique-se de ajustar o código conforme necessário

        console.log('Filtros para animais perdidos:', filters);

        // Exemplo de consulta para animais perdidos (ajuste conforme necessário)
        const resultadosPerdidos = await Animal.findAll({
            where: {
                perdido: 'S', // Assumindo que há um campo "perdido" no seu modelo de Animal
            },
            include: {
                model: User,
                attributes: ['nome', 'email', 'whatsapp'],
                where: {
                    // Adicione quaisquer condições adicionais para filtrar usuários, se necessário
                },
            },
        });

        console.log('Resultados da consulta para animais perdidos:', resultadosPerdidos);

        return resultadosPerdidos;
    } catch (error) {
        console.error('Erro ao pesquisar animais perdidos:', error);
        throw error;
    }
}

module.exports = {
    searchAnimals,
    searchLostPets,
};
