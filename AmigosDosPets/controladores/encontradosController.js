// encontradosController.js

const Petencontrado = require('../models/petencontrado');
const User = require('../models/User');

async function searchFoundPets(filters) {
    try {
        const { especie } = filters;

        const where = {
            situacao_encontrado: 'S',
        };

        if (especie) where.especie_encontrado = especie;

        console.log('Filtros para pets encontrados:', filters);

        const resultadosEncontrados = await Petencontrado.findAll({
            where,
            include: {
                model: User,
                attributes: ['nome', 'email', 'whatsapp'],
            },
        });

        console.log('Resultados da consulta para pets encontrados:', resultadosEncontrados);

        return resultadosEncontrados;
    } catch (error) {
        console.error('Erro ao pesquisar pets encontrados:', error);
        throw error;
    }
}

module.exports = {
    searchFoundPets,
};
