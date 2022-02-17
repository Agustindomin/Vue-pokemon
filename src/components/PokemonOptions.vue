<template>
    <div class="options-container">
        <ul>
            <li v-for="pokemon in pokemons"
                :key="pokemon.id"
                @click="(disabledLi == 0) ? $emit( 'selectedPokemon', pokemon.id ) : '' "
            >
                {{ capitalizeWords(pokemon.name) }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pokemons: {
            type: Array,
            required: true
        },
        disabledLi: {
            type: Number,
            required: true
        }
    },

    methods: {
        //capitalize only the first letter of the string. 
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        //capitalize all words of a string. 
        capitalizeWords(string) {
            return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }
    }

    
}
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    margin-top: 40px;
    display: flex;
    justify-content: center;
}

</style>