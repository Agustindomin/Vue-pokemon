<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <Vidas
                    :vidas="vidas"
                />
            </div>
            <div class="col-6">
                <h1 v-if="!pokemon">Espere por favor...</h1>

                <div v-else>
                    <h1>¿Quién es este Pokémon?</h1>
                    <PokemonPicture
                        :pokemon-id="pokemon.id"
                        :show-pokemon="showPokemon"
                    />

                    <PokemonOptions
                        :pokemons="pokemonArr"
                        :disabledLi="disabledLi"
                        @selected-pokemon="checkSelection"
                    />

                    <template v-if="showAnswer">
                        <h2 class="fade-in">{{ message }}</h2>
                        <h3 class="fade-in text-success">{{ messageTry }}</h3>
                        <div
                            v-if="showNewGame"
                        >
                        <h2>No hay más Vidas!, <b>Game over</b></h2>
                        <button 
                            @click="newGame"
                        >
                            Nuevo juego
                        </button>
                        </div>
                        
                    </template>
                
                </div>

            </div>
            <div class="col-3">
                <Counter
                    :counter="counter"
                />
            </div>

        </div>
    </div>
    
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import Counter        from '@/components/Counter.vue';
import Vidas          from '@/components/Vidas.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions'
import getPokemonSounds  from '@/helpers/getPokemonSounds'




export default {
    components: {
        PokemonPicture,
        PokemonOptions,
        Counter,
        Vidas
    },
    data() {
        return {
            pokemonArr:  [],
            pokemon:     null,
            showPokemon: false,
            showAnswer:  false,
            showNewGame:  false,
            message:     '',
            messageTry:  '',
            counter:     0,
            disabledLi:  0,
            okSeguidos:  0,
            koSeguidos:  0,
            vidas:       3,
        }
    },
    methods: {
        async mixPokemonArray() {
            
            // Asignamos el array de 4 pokemons devueltos
            this.pokemonArr = await getPokemonOptions()

            // Asignamos el pokemon a encontrar de los 4 aleatoriamente
            const rndInt = Math.floor( Math.random() * 4 )
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        checkSelection(selectedId) {

            this.showPokemon = true
            this.showAnswer = true

            if ( selectedId === this.pokemon.id ) {
                this.message = `Correcto!, ${ this.pokemon.name }`
                this.counter += 100;
                this.calculaVidas('OK')
                getPokemonSounds('OK')
            }
            else {
                this.message = `Ooops!, era ${ this.pokemon.name }`
                this.calculaVidas('KO')
                getPokemonSounds('KO')
            }

            this.disabledLi = 1

            if ( this.vidas > 0) {
                this.newTry(5)
            }
            else {
                this.showNewGame = true
            }
            

            // console.log('Pokemon page llamado con la seleccion: '+selectedId)
        },
        calculaVidas( acierto ) {
            switch (acierto) {
                case 'OK':
                    this.okSeguidos += 1
                    this.koSeguidos = 0
                    if ( this.okSeguidos === 3 ) {
                        this.vidas += 1
                        this.okSeguidos = 0
                    }
                    break

                case 'KO':
                    this.okSeguidos = 0
                    this.koSeguidos += 1
                    if ( this.koSeguidos === 3 ) {
                        this.vidas -= 1
                        this.koSeguidos = 0
                    }
                    break
            
                default:
                    break
            }
        },
        newTry( seconds ) {
            if ( seconds > 0) {
                this.messageTry = `El nuevo juego empieza en ${ seconds } segundos`
                setTimeout( this.newTry, 1000, seconds - 1 )
            } else {
                this.messageTry = ''
                this.pokemonArr  = []
                this.pokemon     = null
                this.showPokemon = false
                this.showAnswer  = false
                this.disabledLi  = 0
                this.mixPokemonArray()
            }
        }
        ,
        newGame() {
            this.pokemonArr  = []
            this.pokemon     = null
            this.showPokemon = false
            this.showAnswer  = false
            this.disabledLi  = 0
            this.counter     = 0
            this.disabledLi  = 0
            this.okSeguidos  = 0
            this.koSeguidos  = 0
            this.vidas       = 3
            this.mixPokemonArray()
        }

    },

    mounted() {
        this.mixPokemonArray()
    }

}
</script>

<style scoped>

button {
    background-color: #64BB87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    margin: 0 5px;
    padding: 10px 30px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>

