import pokemonApi from "../api/pokemonApi"


const getPokemons = () => {

    // Array con todos los posibles pokemons, construido así pokemonsArr si se puede cambiuar
    const pokemonsArr = Array.from( Array(650))

    // Ponemos valores de 1 a 650 (indices 0 a 649)
    return pokemonsArr.map( (arg, index) => index + 1 )

}

const getPokemonOptions = async() => {

    // Definimos los pokemos mixed
    const mixPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    // Como Math.random() está en el intervalo abierto (0,1), el restarle 0.5 hace que el valor unas veces sea
    // positivo y otrras negativo aleatorimente, por tanto cuando sort() recorre el array unas veces lo pondrá delante y otras detrás
    
    // Obtenemos los nombre sólo de los 4 primeros con splice
    const pokemons = await getPokemonNames( mixPokemons.splice(0,4) )
    // console.table( pokemons )

    return pokemons

}

const getPokemonNames = async( [p1, p2, p3, p4] = [] ) => {

    // const resp = await pokemonApi.get(`/${1}`)
    // console.log(resp.data.name, resp.data.id)
    // // console.log( p1, p2, p3, p4 )

    // Disparamos las 4 peticiones en paralelo con Promise.all que ejecuta un array de promesas
    const promisesArr = [
        pokemonApi.get(`/${ p1 }`),
        pokemonApi.get(`/${ p2 }`),
        pokemonApi.get(`/${ p3 }`),
        pokemonApi.get(`/${ p4 }`)
    ]

    const [ r1, r2, r3, r4 ] = await Promise.all( promisesArr )
    return [
        {name: r1.data.name, id: r1.data.id},
        {name: r2.data.name, id: r2.data.id},
        {name: r3.data.name, id: r3.data.id},
        {name: r4.data.name, id: r4.data.id},
    ]

}

export default getPokemonOptions