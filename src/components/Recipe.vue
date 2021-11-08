<template>
    <v-container>
        <div>
            <!-- Título da receita -->
            <v-row justify="space-around" class="mt-4">
                <v-card class="grey lighten-2">
                    <v-card-title primary-title>
                        {{recipe.title | uppercase}}
                    </v-card-title>
                </v-card>
            </v-row>
            <!-- Nome do autor da receita.
            Ao clicar no card, carrega a página do autor, com a lista de
            receitas dele -->
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
            <!-- Mostra a lista de ingredientes da receita -->
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
            <!-- Mostra as instruções de prepado da receita -->
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
            <!-- Mostra o rednmento da receita, se este tiver sido especificado -->
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
        // Ao iniciar o componente, busca na sequência as informações
        // da tabela de receitas, da tabela de rendimento da receita
        // e da tabela de autores da receita

        // TODO: incluir a lista de ingredientes da receita
        // com método de preparo e outras informações relevantes
        // Utilizar como parâmetro as informações incluídas no
        // component RecipeStep2.vue
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