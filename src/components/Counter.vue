
<template>
    <h2>Puntuación:</h2>
    <span class="fade-in contador"> {{ counter }} </span>
</template>

<script>
export default {
    props: {
        counter: {
            type: Number,
            default: 0,
            required: true
        }
    },

    computed: {
        setCounter() {
            return this.counter + 10
        }
    }
}
</script>

<style scoped>
.contador {
    background-color: white;
    border-radius: 5px;
    border: 1px solid #64BB87;
    color: #64BB87;
    font-weight: bold;
    font-size: 24px;
    margin: 0 5px;
    padding: 5px 15px;  
}
</style>

