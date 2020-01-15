//useEffect: usado para disparar uma função toda vez que uma informação alterar - ou uma única vez que o componente for renderizado (mouth)
import React, { useEffect, useState } from 'react';

import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import api from './services/api'
//pega o item automaticamente
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  //vários devs []
  const [ devs, setDevs ] = useState([])

  //a listagem dos devs acontece uma única vez
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    //chama a execução da função
    loadDevs()
  }, [])

  //quando o usuário clicar no submit
  async function handleAddDev(data){
    //realiza a chamada a API para adicionar o dev na listagem
    //informa qual a URL e quais parâmetros irá enviar
    const response = await api.post('/devs', {data})

    //copia todos os devs e adiciona o inserido
    setDevs([...devs, response.data])
  }

  return (
    //div app que engloba a aplicação inteira
    //tag aside: tag do HTML para criar uma sidebar
    //main: conteúdo principal da aplicação (listagem dos devs)
    //usa o htmlFor ao inves do for do HTML pq o for é uma palavra reservada do JS
    //se for colocar uma class n pode usar tbm a palavra class - use className
    //o id do input serve para qnd vc clicar no label ele selecione o input referente
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
