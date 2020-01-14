//importação do módulo de roteamento do express
//importação específica do Router
const { Router } = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

//em routes você tem acesso a todos os métodos disponíveis (get, post, use..)
const routes = Router()

//as rotas normalmente possuem os nomes no plural
//a flag async informa que a função pode demorar para responder, pois possui uma chamada à outra API (github)
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)

//mobile
routes.get('/search', SearchController.index)

//exportação das rotas para que a aplicação tenha acesso
module.exports = routes