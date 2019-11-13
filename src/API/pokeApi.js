function getPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20' //get 20 poke
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error))
}

function getPokemonSpecs(url) {
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getPokemonById(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

export default { getPokemons, getPokemonSpecs, getPokemonById}