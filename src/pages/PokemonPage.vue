<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <h1>Marcador:</h1>
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
                        <button v-if="showNewGame"
                            @click="newGame"
                        >
                            Nuevo juego
                        </button>
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

import getPokemonOptions from '@/helpers/getPokemonOptions'
import getPokemonSounds from '@/helpers/getPokemonSounds'


export default {
    components: {
        PokemonPicture,
        PokemonOptions,
        Counter
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
                getPokemonSounds('OK')
            }
            else {
                this.message = `Ooops!, era ${ this.pokemon.name }`
                getPokemonSounds('KO')
            }

            this.disabledLi = 1

            this.newTry(5)

            // console.log('Pokemon page llamado con la seleccion: '+selectedId)
        },
        newTry( seconds ) {
            if ( seconds > 0) {
                this.messageTry = `El nuevo juego empieza en ${ seconds } segundos`
                setTimeout( this.newTry, 1000, seconds - 1 )
            } else {
                this.messageTry = ''
                this.newGame()
            }
        }
        ,
        newGame() {
            this.pokemonArr  = []
            this.pokemon     = null
            this.showPokemon = false
            this.showAnswer  = false
            this.disabledLi  = 0
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
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>

