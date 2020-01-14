//como utiliza em mais de um lugar deve separar em um arquivo diferente
//para evitar o dry: dont repeat yourself (não repita as regras de negócio da sua aplicação)
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim())
}