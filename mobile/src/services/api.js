import axios from 'axios'

const api = axios.create({
    //depende do SO e do ambiente
    //celular: IP que aparece no expo: xx:porta_no_node
    //baseURL: 'http://192.168.56.1:3333'
    //emulador ios: coloca localhost no ip
    //emulador android: coloca o ip do expo, se n funcionar coloque: 10.0.2.2
    baseURL: 'http://192.168.56.1:3333'
})
export default api