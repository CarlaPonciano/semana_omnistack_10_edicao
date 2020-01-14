//criado em arquivo separado para futuro reutilização
const mongoose = require('mongoose')

//código pego da documentação do mongoose

//criação do schema
const PointSchema = new mongoose.Schema({
    type: {
        type: String, 
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
})

module.exports = PointSchema