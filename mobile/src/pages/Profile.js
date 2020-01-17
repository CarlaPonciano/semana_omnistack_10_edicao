//página inicial: mapa
import React from 'react'
import { WebView } from 'react-native-webview';

//pega a rota que está recebendo
function Profile({ navigation }) {
    //pega o parâmetro enviado
    const githubUsername = navigation.getParam('github_username')
    
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}

export default Profile