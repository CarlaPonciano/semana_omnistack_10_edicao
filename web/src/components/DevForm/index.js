import React, { useState, useEffect } from 'react'
import './styles.css'

function DevForm({ onSubmit }) {
    const [ latitude, setLatitude ] = useState('')
    const [ longitude, setLongitude ] = useState('')

    const [ github_username, setGitHubUsername ] = useState('')
    const [ techs, setTechs ] = useState('')

    //param1: qual função precisa executar
    //param2: quando a função precisa executar - [] - se o vetor estiver vazio, a função irá executar uma única vez
    //se colocar uma variável, sempre que ela mudar, irá executar o código
    useEffect(() => {
        //retorna primeiro a função de sucesso
        //segundo a função de erro
        //no final passa alguns parâmetros para o getCurrentPosition
        //enableHighAccuracy: habilitar pegar a posição do usuário muito precisamente : alta precisão
        //timeout: 30 segundos
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords

            setLatitude(latitude)
            setLongitude(longitude)
        }, 
        (err) => {
            console.log(err)
        },
        {
            timeout: 30000,
        }
        )
    }, [])

    async function handleSubmit(e) {
        //preveni o comportamento padrão do HTML em formulário
        //que é de enviar o usuário para uma outra página
        e.preventDefault()

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        })

        setGitHubUsername('')
        setTechs('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required value={github_username} 
                onChange={e => setGitHubUsername(e.target.value)}/>
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs}
                onChange={e => setTechs(e.target.value)}/>
            </div>

            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" name="latitude" id="latitude" required value={latitude}
                onChange={e => setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" name="longitude" id="longitude" required value={longitude}
                onChange={e => setLongitude(e.target.value)}/>
            </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm