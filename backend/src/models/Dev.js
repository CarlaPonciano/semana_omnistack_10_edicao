//importação do mongoose para informar qual é o formato (estrutura de dados) do Dev na base de dados
const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

//schema: estruturação de uma entidade no bd
const DevSchema = new mongoose.Schema({
    //formato que o campo será salvo no banco: String, Number, Boolean
    name: String, 
    github_username: String,
    bio: String,
    avatar_url: String,
    //vetor de Strings
    techs: [String],
    //latitude e longitude serão armazenadas de forma diferente
    //passagem de configurações a mais
    location: {
        type: PointSchema,
        //em geolocalização é necessários criar um índice para facilitar a busca
        //significa esfera 2d (eixo x e y)
        index: '2dsphere'
    }
})

//param1: nome que o model vai ter, como será salvo no banco de dados
//param2: schema
module.exports = mongoose.model('Dev', DevSchema)