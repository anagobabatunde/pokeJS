function getPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=26' //get 20 poke
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error))
}

function getPokemonByUrl(url) {
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getPokemonById(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getPokemonDesc(id) {
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + id;
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

// function getPokemonId(id) {
//     let url = "https://pokeapi.co/api/v2/pokemon/8/"

// }

function getTypes() {
    let url = 'https://pokeapi.co/api/v2/type/'
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getPokemonByTypeId(id) {
    let url = 'https://pokeapi.co/api/v2/type/' + id
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}


export default { getPokemons, getPokemonByUrl, getPokemonByTypeId, getTypes, getPokemonDesc, getPokemonById}
