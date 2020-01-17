//fica por fora de toda a navegação da aplicação
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

//componente
const Routes = createAppContainer(
    //passagem do objeto com as rotas da aplicação
    createStackNavigator({
        //mudança do título da aplicação
        //screen: qual componente será renderizado
        //opções específicas da tela: navigationOption:{ } 
        Main: {
            screen: Main,
            navigationOptions: {
                //headerTitle: pode colocar uma imagem/componente
                //o title coloca um título em String
                title: 'DevRadar',
                headerTitleAlign: 'center'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            }
        }
    }, {
        //opções aplicadas a todas as telas
        defaultNavigationOptions: {
            //muda a cor do título
            headerTintColor: '#FFF',
            //tira a opção de voltar com o nome da rota - IOS
            headerBackTitleVisible: false,
            //estilização do header
            headerStyle: {
                backgroundColor: '#7D40E7'
            }
        }
    })
)

export default Routes