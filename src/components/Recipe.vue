<template>
    <v-container>
        <div>
            <!-- Título da receita -->
            <v-row justify="space-around" class="mt-4">
                <v-card class="grey">
                    <v-card-title primary-title class="d-flex justify-space-between">
                        <h1>{{recipe.title | uppercase}}</h1>
                    </v-card-title>
                    <v-card-text>
                        <h2>{{category.name}}</h2>
                    </v-card-text>
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
                     
                >
                    <v-card-text class="d-flex justify-space-between">
                        <span class="clickable" @click="$emit('showAuthor',author)"><strong>Autor:</strong> {{author.name | uppercase}}</span>
                        <v-btn color="primary" x-small fab @click="editRecipeAuthorDialog()">
                            <v-icon dense>mdi-pencil</v-icon>
                        </v-btn>
                    </v-card-text>

                </v-card>
            </v-row>
            <edit-recipe-author-dialog
                :visible="recipeAuthorDialog" 
                @close="closeEditRecipeAuthorDialog($event)" 
                :recipe="recipe"
                :author="author" />

            <!-- Mostra a lista de ingredientes da receita -->
            <!-- TODO: alterar para mostrar a ingredient_list, com os parâmetros, ao invés de somente os
            ingredientes utilizados -->
            <v-row justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title class="d-flex justify-space-between">
                        <span>Ingredientes</span>

                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab dark small color="primary" @click.stop="newIngredientDialog=true"
                                    v-bind="attrs" v-on="on">
                                    <v-icon dark>mdi-food-variant</v-icon>
                                </v-btn>
                            </template>
                            <span>Criar novo Ingrediente</span>
                        </v-tooltip> -->

                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" x-small fab @click.stop="editIngredientListDialog=true"
                                v-bind="attrs" v-on="on">
                                    <v-icon dense>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="primary" x-small fab @click="editIngredientListDialog(ingredientList)">
                                    <v-icon dense>mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar Lista de Ingredientes</span>
                        </v-tooltip> -->
                    </v-card-title>
                    <v-card-text>
                        <!-- TODO: Mudar para DataTable: copiar de RecipeStepper 2, mantendo botões para 
                        editar e excluir.
                        Utilizar uma janela de diálogo para editar, e um diálogo de confirmação para
                        excluir -->
                        <!-- <ul>
                            <li v-for="il in ingredientList" :key="il.id">
                                {{il.i_name}} - Quantidade: {{il.amount}} {{il.u_name}} - Usado para: {{il.g_name}}
                            </li>
                        </ul> -->
                        <v-data-table
                                :headers="ingredientListHeader"
                                :items="ingredient_list"
                                class="elevation-1"
                                item-key="key"
                            >
                                <!-- Botão para editar o item da lista de ingredientes -->
                                <template v-slot:[`item.edit`]="{ item }">
                                    <v-btn icon @click="editIngredientListItem(item)">
                                        <v-icon color="orange lighten-2">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                                <!-- Botão para excluir o item da lista de ingredientes -->
                                <template v-slot:[`item.delete`]="{ item }">
                                    <v-btn icon @click="removeIngredientListItem(item)">
                                        <v-icon color="red lighten-1">mdi-close-outline</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                    </v-card-text>
                </v-card>
            </v-row>

            <edit-ingredient-list :visible="editIngredientListDialog" @close="closeIngredientListDialog($event)" />
            <edit-ingredient-list-item-dialog
                v-if="editIngredientListItemDialog" 
                :visible="editIngredientListItemDialog" 
                @close="closeIngredientListItemDialog($event)"
                :ingredientListItem="ingredientListItemEdit" />
            <remove-ingredient-list-item-dialog
                v-if="removeIngredientListItemDialog" 
                :visible="removeIngredientListItemDialog" 
                @close="closeRemoveIngredientListItemDialog($event)"
                :ingredientListItem="ingredientListItemRemove" />
            <!-- Mostra as instruções de prepado da receita -->
            <v-row  justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title  class="d-flex justify-space-between">
                        <span><strong>Modo de Preparo</strong></span>
                        <v-btn color="primary" x-small fab @click="editInstructionsDialog()">
                            <v-icon dense>mdi-pencil</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div>{{recipe.instructions}}</div>
                        <div>
                            <h3><strong>Tempo de preparo: </strong>{{recipe.prep_time}}</h3>
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
            <edit-instructions-dialog 
                :visible="instructionsDialog" 
                @close="closeEditInstructionsDialog($event)" 
                :recipe="recipe" />
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
import EditIngredientList from './EditDialogs/EditIngredientList.vue'
import RecipeMixin from '@/components/new/recipemixin.js'
import EditIngredientListItemDialog from './EditDialogs/EditIngredientListItemDialog.vue'
import RemoveIngredientListItemDialog from './EditDialogs/RemoveIngredientListItemDialog.vue'
import EditInstructionsDialog from './EditDialogs/EditInstructionsDialog.vue'
import EditRecipeAuthorDialog from './EditDialogs/EditRecipeAuthorDialog.vue'
export default {
  components: { 
      EditIngredientList, 
      EditIngredientListItemDialog, 
      RemoveIngredientListItemDialog, 
      EditInstructionsDialog,
      EditRecipeAuthorDialog 
    },
    props: ['recipe'],
    mixins: [RecipeMixin],
    data() {
        return {
            editIngredientListDialog: false,
            editIngredientListItemDialog: false,
            recipeAuthorDialog: false,
            instructionsDialog: false,
            ingredientListItemEdit: {},
            removeIngredientListItemDialog: false,
            ingredientListItemRemove: {},

            ingredients:[],
            // yield_type:null,
            // author:null,
            // ingredientList:[],
            ingredientListHeader:[
                {
                    text: 'Ingrediente',
                    align: 'start',
                    sortable: true,
                    value: 'i_name',
                },
                {
                    text: 'Pode ser substituído por',
                    align: 'start',
                    sortable: true,
                    value: 'substitute_for_name',
                },
                {
                    text: 'Modo de Preparo',
                    align: 'start',
                    sortable: true,
                    value: 'prm_name',
                },
                {
                    text: 'Quantidade',
                    align: 'start',
                    sortable: true,
                    value: 'amount',
                },
                {
                    text: 'Unidade de Medida',
                    align: 'start',
                    sortable: true,
                    value: 'u_name',
                },
                {
                    text: 'Usado para',
                    align: 'start',
                    sortable: true,
                    value: 'g_name',
                },
                {
                    text: 'Editar',
                    align: 'start',
                    sortable: true,
                    value: 'edit',
                },
                {
                    text: 'Excluir',
                    align: 'start',
                    sortable: true,
                    value: 'delete',
                },
            ],
        }
    },
    computed: {

    },
    methods: {
        // TODO: ao fechar os diálogos com cancelamento, a receita deve retornar ao estado anterior.
        // TODO: provável necessidade de definir o evento de fechamento como o estado original.
        substitute_for_name(id){
            let substitute = this.ingredients.find(ingredient => ingredient.id == id)
            return substitute?substitute.name?substitute.name:'':''
        },
        goto(id){
            this.$emit('showRecipe', id)
        },
        closeIngredientListDialog(event){
            // this.loadUnits()
            console.log(event)
            this.editIngredientListDialog=false
        },
        closeIngredientListItemDialog(event){
            // this.loadUnits()
            console.log(event)
            this.editIngredientListItemDialog=false
            this.
            this.loadIngredientsList()
        },
        closeRemoveIngredientListItemDialog(event){
            // this.loadUnits()
            console.log(event)
            this.removeIngredientListItemDialog=false
            this.loadIngredientsList()
        },
        closeEditInstructionsDialog(event){
            // this.loadUnits()
            console.log(event)
            this.recipe.instructions = event.instructions
            this.recipe.prep_time = event.prep_time
            this.instructionsDialog=false
        },
        closeEditRecipeAuthorDialog(event){
            // this.loadUnits()
            console.log(event)
            console.log("🚀 ~ file: Recipe.vue ~ line 289 ~ closeEditRecipeAuthorDialog ~ event", event)
            this.author = event
            this.recipeAuthorDialog=false
        },
        editIngredientListItem(item){
            console.log(item)
            this.ingredientListItemEdit = item
            this.editIngredientListItemDialog=true
        },
        removeIngredientListItem(item){
            this.ingredientListItemRemove = item
            this.removeIngredientListItemDialog=true
        },
        loadRecipe(){
            this.loadIngredients()
            this.loadIngredientsList()
            this.loadYieldType()
            this.loadAuthor()
            this.loadCategory()
        },
        loadIngredients(){
            this.axios.get(`ingredients/recipe/${this.recipe.id}`)
                .then(i=>{
                    this.ingredients = i.data
                })
        },
        loadIngredientsList(){
            this.axios.get(`ingredient_list/recipe/${this.recipe.id}`)
                .then(response => {
                    this.ingredient_list = response.data.map(ingredient_list => {
                        return {
                            ...ingredient_list, 
                            key: `${ingredient_list.id}-${ingredient_list.pm_id}`,
                            substitute_for_name: this.substitute_for_name(ingredient_list.substitute_for),
                        }
                    })
                    console.log("🚀 ~ file: Recipe.vue ~ line 258 ~ created ~ this.ingredient_list", this.ingredient_list)
                })
        },
        loadYieldType(){
            this.axios.get(`yield/recipe/${this.recipe.id}`)
            .then(y=>{
                this.yield_type = y.data[0]
            })
        
        },
        loadCategory(){
            this.axios.get(`category/recipe/${this.recipe.id}`)
            .then(c=>{
                this.category = c.data[0]
            })
        },
        loadAuthor(){
            this.axios.get(`author/recipe/${this.recipe.id}`)
            .then(y=>{
                this.author = y.data[0]
            })
        },

        editRecipeAuthorDialog(){
            this.recipeAuthorDialog=true
        },
        editInstructionsDialog(){
            this.instructionsDialog=true
        },
    },
    created(){
        // Carrega as informações da receita
        this.loadRecipe()
    }
}
</script>

<style scoped>
.clickable{
    cursor: pointer;
}
</style>