const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        //buscar todos os devs em um raio de 10km
        //filtra por tecnologias
        const { latitude, longitude, techs } = request.query
        const techsArray = parseStringAsArray(techs)

        //com filtros
        const devs = await Dev.find({
            //pode passar vários filtros
            //in: operador lógico do mongo
            techs: { 
                //que estão em:
                $in: techsArray
            },
            //encontra objetos perto de uma localização
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    //máximo de distância que quer retornar os objetos
                    //10000: 10km
                    $maxDistance: 10000,
                }
            }
        })
        return response.json({ devs })
    }
}