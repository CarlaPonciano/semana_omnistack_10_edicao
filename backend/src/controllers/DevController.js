const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        //é possível utilizar filtros
        //ex: Dev.find({ name: 'Carla' })

        return response.json(devs)
    },
    async store(request, response) {
        //operador destructing para pegar username
        //a desestruturação pega apenas o desejével
        const { github_username, techs, latitude, longitude } = request.body

        //evitar a duplicação de inserção de usuários com o msm username
        //findOne: encontrar 1 baseado em 
        let dev = await Dev.findOne({ github_username })

        //se não houver o registro do dev, cria
        if(!dev) {
            //conexão com a API do GitHub para buscar os dados do usuário (nome, avatar)
            //response: resposta que obtém a partir da chamada à API
            //passa a URL da API do GitHub
            //await: aguarda a finalização da conexão à API para dar prosseguimento
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            //se o name não existir ele pega o login, basta colocar o =
            const { name = login, avatar_url, bio } = apiResponse.data
            
            //transforma as tecnologias em um array
            //split: separa na virgula e o trim remove os espaços em branco antes e depois
            const techsArray = parseStringAsArray(techs)
        
            //data: dados da resposta obtida
            //console.log(apiResponse.data)
        
            const location = {
                type: 'Point',
                //passa primeiro a longitudo e dps a latitude (padrão mongo)
                coordinates: [longitude, latitude]
            }
        
            //criação do dev
            //salva o retorno da função na variável dev
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //filtrar as conexões procurando por aquelas que satisfaçam aos filtros (coordenadas e tecnologias)
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return response.json(dev)
    }
}