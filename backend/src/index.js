//importação do módulo express
const express = require('express')
//importação do mongo
const mongoose = require('mongoose')
//importação das rotas
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const { setupWebsocket } = require('./websocket')

//as variáveis são const pois elas não serão alteradas: valor fixo

//conexão ao banco
//a string é a gerada no site do mongo
mongoose.connect('mongodb+srv://carla:estudo@cluster0-3aef4.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//início da criação do servidor
//criação de rota - URL com resposta do servidor
const app = express()

//servidor http fora do express para trabalhar com ele diretamente
//extrai o servidor http do express
const server = http.Server(app)
//chama a função criada enviando o servidor
setupWebsocket(server)

//definição da porta da aplicação
server.listen(3333)

//se não colocar o parâmetro permite o acesso interno para todo o tipo de aplicação
app.use(cors())
//determina o endereço que irá chamar
//app.use(cors({ origin: 'http://localhost:3000' }))

//.use - informa que será utilizado para todas as rotas da aplicação
//informa para o express entender o corpo de requisições no formato JSON
app.use(express.json())

//cadastro das rotas
app.use(routes)

//o primeiro parâmetro é o caminho
//o segundo parâmetro é uma outra função arrow que é composto pela requisição e a resposta
//requisição: tudo que vem do frontend, acesso a rota, requisição ao servidor que pode conter parâmetros
//resposta: o que devolve pro frontend - json (objeto ou vetor JS)

//pode colocar o nome que quiser no identificador
/*app.post('/users', (request, response) => {
    console.log(request.body)
    return response.json({ message: 'Semana OmniStack' })
})*/