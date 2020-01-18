//faz com que o servidor fique escutando também o protocolo websocket
const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

//salvamento das conexões 
//idel que seja em um BD 
//realizado na memória do node
const connections = []
let io

//exporta o primeiro método
//faz as primeiras configurações para o servidor aceitar as requisições no formato websocket
exports.setupWebsocket = (server) => {
    io = socketio(server)
    
    //toda vez que receber uma conexão
    //listener .on
    io.on('connection', socket => {
        //pega o parâmetros recebidos
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
    })
}

//faz o filtro das conexões
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        //calcula a distancia. < 10km
        //some: retorna se pelo menos 1 é true
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

//pra quem quer mandar a msg
//o tipo da msg
//e o valor
exports.sendMessage = (to, message, data) => {
    //percorre cada um dos destinatários
    to.forEach(connection => {
        //envia a msg ao socketid
        //qual o tipo da mensagem e o valor
        io.to(connection.id).emit(message, data)
    })
}