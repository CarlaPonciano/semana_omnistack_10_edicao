//configuração do websocket no mobile
import socketio from 'socket.io-client'

//passa qual é o endereço do backend
const socket = socketio('http://192.168.56.1:3333', {
    //não deixa fazer a conexão automaticamente
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction) {
    //escuta o evento
    socket.on('new-dev', subscribeFunction)
}

//faz a conexão
function connect(latitude, longitude, techs) {
    //manda como opções os parâmetros para o backend
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect()
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect()
    }
}

export { connect, disconnect, subscribeToNewDevs }