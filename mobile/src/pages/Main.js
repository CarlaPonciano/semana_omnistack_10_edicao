//página inicial: mapa
import React, { useEffect, useState } from 'react'
//Marker: marcação dentro do mapa
//Callout: informações que aparecem qnd clica no marker (balãozinho)
import MapView, { Marker, Callout } from 'react-native-maps'
//TouchableOpacity: botão que quando clica diminui um pocuo a opacidade
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
//requestPermissionAsync: pede permissões ao usuário para utilizar a localização
//getCurrentPositionAsync: pega a localização do usuário
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
//ícones
import { MaterialIcons } from '@expo/vector-icons'
//importação da api
import api from '../services/api'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')

    //carrega a localização do usuário para abrir mostrando no mapa
    //[] será executada apenas 1 vez
    //chamada assíncrona
    useEffect(() => {
        async function loadInitialPosition() {
            //pede inicialmente a permissão
            //retorna um objeto com várias informações, pega o granted - boolean (deu permissão ou não)
            const { granted } = await requestPermissionsAsync()

            //se sim, busca as coordenadas
            if (granted) {
                //pode utilizar o GPS do usuário para pegar uma localização mais precisa, basta passar o objeto com enableHighAccuracy
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })
                
                const response = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    //cálculos navais(complexos) para obter o zoom no mapa
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    //carregar usuários: carrega toda vez que o usuário clica no botão
    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        try {
            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            })

            setDevs(response.data.devs)
        } catch(err) {
                console.error(err);
        }
        
    }

    //muda a localização quando o usuário percorre no mapa
    function handleRegionChange(region) {
        setCurrentRegion(region)
    }

    if(!currentRegion) return null

    //navegação para a próxima pagina em callout
    //onRegionChangeComplete: qnd o usuário navega no mapa 
    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChange} 
                initialRegion={currentRegion} 
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        coordinate={{ 
                            latitude: dev.location.coordinates[1], 
                            longitude: dev.location.coordinates[0]
                        }}
                    >
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: dev.avatar_url }} 
                        /> 

                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    //coloca a primeira letra de cada palavra em caixa alta
                    autoCapitalize="words"
                    //não tentará corrigir o texto da input de forma padrão
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}> 
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Main

const styles = StyleSheet.create({
  map: {
      flex : 1
  },
  avatar: {
      width: 54,
      height: 54,
      borderRadius: 4,
      borderWidth: 4, 
      borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  }, 
  devBio: {
    color: '#666',
    marginTop: 5
  }, 
  devTechs: {
    marginTop: 5
  },
  searchForm: {
      //colocar em cima so mapa: absolute: flutua em cima do mapa
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
      //força que fique em cima do mapa
      zIndex: 5,
      flexDirection: 'row'
  },
  searchInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      color: '#333',
      borderRadius: 25, 
      paddingHorizontal: 20,
      fontSize: 16,
      //ios
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
          width: 4,
          height: 4
      },
      //fim ios
      //android: apenas 1
      //pega o elemento e "eleva" resultando em uma sombra
      elevation: 2
  },
  loadButton: {
      width: 50,
      height: 50,
      backgroundColor: '#8E4Dff',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15
  }
})