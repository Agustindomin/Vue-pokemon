
<template>
    <h2>Vidas:</h2>
    <div v-if="vidas"
        class="container-vidas"
    >
        <img v-for="vida in vidas"
            :key="vida"
            class="vida"
            src="@/assets/images/person-icon-png-transparent-15.png"
            alt="Vida"         
        />
    </div>
    
</template>

<script>
export default {
    props: {
        vidas: {
            type: Number,
            default: 0,
            required: true
        }
    }
}
</script>

<style scoped>
.container-vidas{
    padding-left: 33%;
}
.vida {
    float: left;
    margin-right: 6px;
    height: 32px;
    width: 30px;
}
.hidden-vidas {
    filter: brightness(0);
}
</style>

