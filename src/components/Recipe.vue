<template>
    <v-container>
        <div>
            <v-row justify="space-around" class="mt-4">
                <v-card class="grey lighten-2">
                    <v-card-title primary-title>
                        {{recipe.title | uppercase}}
                    </v-card-title>
                </v-card>
            </v-row>
            <v-row v-if="author" justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                     @click="$emit('showAuthor',author)"
                >
                    <v-card-text>
                        <strong>Autor:</strong> {{author.name | uppercase}}
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title>
                        Ingredientes
                    </v-card-title>
                    <v-card-text>
                        <ul>
                            <li v-for="ingredient in ingredients" :key="ingredient.id">
                                {{ingredient.name}}
                            </li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row  justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title>
                        Modo de Preparo
                    </v-card-title>
                    <v-card-text>
                        {{recipe.instructions}}
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row v-if="yield_type" justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title>
                        Rendimento
                    </v-card-title>
                    <v-card-text>
                        {{yield_type.yield_amount}} {{yield_type.name}}
                    </v-card-text>
                </v-card>
            </v-row>
        </div>
    </v-container>
</template>

<script>
export default {
    props: ['recipe'],
    data() {
        return {
            ingredients:[],
            yield_type:null,
            author:null
        }
    },
    methods: {
        goto(id){
            this.$emit('showRecipe', id)
        }
    },
    created(){
        this.axios.get(`ingredients/recipe/${this.recipe.id}`)
            .then(i=>{
                this.ingredients = i.data
            })
        this.axios.get(`yield/recipe/${this.recipe.id}`)
            .then(y=>{
                this.yield_type = y.data[0]
            })
            
        this.axios.get(`author/recipe/${this.recipe.id}`)
            .then(y=>{
                this.author = y.data[0]
            })

    }
}
</script>

<style>

</style>