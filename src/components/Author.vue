<template>
    <div>
        <h2>{{author.name}}</h2>
        <ul>
            <li v-for="recipe in recipes" :key="recipe.id" @click="$emit('showRecipe',recipe)">
                {{recipe.title | uppercase}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['author'],
    data() {
        return {
            recipes:[]
        }
    },
    created() {
        this.axios.get(`recipes/author/${this.author.id}`)
            .then((result) => {
                this.recipes = result.data
            }).catch((err) => {
                console.error(err)
            });
    },
}
</script>

<style>

</style>