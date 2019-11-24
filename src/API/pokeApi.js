function getPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20' //get 20 poke
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error))
}

/*
    getAllPokemons(); This request is dynamic AND optimized: 
    We send a first request less than 1kb to get the max pokemon count, then we send a second one to retrieve all the items from the API. t=
    This makes a total payload less than 12kb and 2 network packets which is nothing. After discussion with some Cisco employees, this is fair enough.
*/
async function getAllPokemons() {
   try {
    let urls = [ 'https://pokeapi.co/api/v2/pokemon/?limit=1', 'https://pokeapi.co/api/v2/pokemon/?limit=']
    let resCount = await fetch(urls[0]).then((response) => response.json()).catch((error) => console.log(error));
    if (resCount < 1)
        return "Unable to retrieve all items from API (received " + resCount.count + ", expected at least 20).";
    let resAll = await fetch(urls[1] + resCount.count).then((response) => response.json()).catch((error) => console.log(error))
    return resAll;
   } catch(err) {
       return "Bad response from server."
   }
}


function getPokemonsOffLim(offset, limit) {
    let lim = '&limit=' + limit || null 
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offset + lim
    console.log("lim is ", lim, url);
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error))
}

function getPokemonByUrl(url) {
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getEvolution(url) {
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


function getSimple(path) {
    let url = 'https://pokeapi.co/api/v2/' + path
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}

function getPokemonByXId(x ,id) {
    let url = 'https://pokeapi.co/api/v2/' + x + '/' + id
    return fetch(url).then((response) => response.json()).catch((error) => console.log(error));
}


export default { getPokemons, getSimple, getPokemonByXId, getPokemonDesc, getPokemonById, getPokemonByUrl, getPokemonsOffLim, getAllPokemons, getEvolution}
