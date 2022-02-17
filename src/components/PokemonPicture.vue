<template>
    <div class="pokemon-container">
        <img :src="imgSrc"
            class="hidden-pokemon"
            alt="Pokemon">
        <img v-if="showPokemon"
            :src="imgSrc"
            class="fade-in" 
            alt="Pokemon">
    </div>
    
</template>

<script>
export default {

    props: {
        pokemonId: {
            type: Number,
            default: 4,
            required: true,
            validator( value ) {
                return value >= 0
            }
        },
        showPokemon: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    computed: {
        imgSrc() {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ this.pokemonId }.svg`
        }
    }

}
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
    height: 200px;
    margin-top: 40px;
}
img {
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto; 
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}

</style>