
<template>
<!-- TODO: Ingredient_Group -->
<!-- TODO: Substitute_For -->
    <v-container>
        <v-form v-model="valid" ref="form" lazy-validation>
            <div class="pa-6">
                <v-container fluid>

                    <v-row>
                        <v-col cols="5">
                            <v-autocomplete
                                label="Ingrediente"
                                :items="ingredients"
                                v-model="ingredient"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                            <v-autocomplete
                                label="Pode ser substituído por:"
                                :items="substitutes"
                                v-model="substitute_for"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newIngredientDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-food-variant</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar novo Ingrediente</span>
                            </v-tooltip>
                        </v-col>
                        <new-ingredient :visible="newIngredientDialog" @close="closeIngredientDialog($event)" />
                    </v-row>
                    <v-row>
                        <v-col cols="5">
                            <v-autocomplete
                                label="Usado para"
                                :items="ingredient_groups"
                                v-model="ingredient_group"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newIngredientGroupDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-bowl-mix-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar novo Uso para Ingrediente</span>
                            </v-tooltip>
                        </v-col>

                        <new-ingredient-group :visible="newIngredientGroupDialog" @close="closeIngredientGroupDialog($event)" />

                        <v-col cols="5">
                            <v-autocomplete
                                label="Método de Preparo"
                                :items="prep_methods"
                                v-model="prep_method"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newPrepMethodDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-toaster-oven</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar novo Método de Preparo</span>
                            </v-tooltip>
                        </v-col>
                        <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                        <new-prep-method :visible="newPrepMethodDialog" @close="closePrepMethodDialog($event)" />
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field label="Quantidade" v-model="unit_amount" required
                                type="number"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                label="Unidade de Medida"
                                :items="units"
                                v-model="unit"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newUnitDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-ruler-square-compass</v-icon>
                                    </v-btn>
                                </template>
                                <span>Adicionar Unidade de Medida</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="insertIntoIngredientList"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-playlist-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Adicionar à Lista de Ingredientes</span>
                            </v-tooltip>
                        </v-col>
                        <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                        <new-unit :visible="newUnitDialog" @close="closeUnitDialog($event)" />
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-data-table
                                :headers="ingredient_list_header"
                                :items="ingredient_list"
                                class="elevation-1"
                            >
                                        <!-- Botão para editar o item da lista de ingredientes -->
                                <template v-slot:[`item.edit`]="{ item }">
                                    <v-btn icon @click="edit(item)">
                                        <v-icon color="orange lighten-2">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                                <!-- Botão para excluir o item da lista de ingredientes -->
                                <template v-slot:[`item.delete`]="{ item }">
                                    <v-btn icon @click="remove(item)">
                                        <v-icon color="red lighten-1">mdi-close-outline</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-form>
<!--


                            <div>step2</div>

                            <div>Tabela: lista de ingredientes</div>

                            <div>Lista autocomplete de ingredientes | lista de métodos de preparo</div>

                            <div>quantidade | tipo de quantidade</div>

                            <div>Botão adicionar à lista de ingredientes</div> -->
    </v-container>
</template>

<script>
import NewPrepMethod from '@/components/NewPrepMethod'
import NewIngredient from '@/components/NewIngredient'
import NewIngredientGroup from '@/components/NewIngredientGroup'
import NewUnit from '@/components/NewUnit'
import RecipeMixin from '@/components/new/recipemixin.js'
export default {
    mixins:[RecipeMixin],
    components:{
        NewPrepMethod,
        NewIngredient,
        NewIngredientGroup,
        NewUnit
    },
    data() {
        return {
            valid:true,
            // ingredient_list:[
            //     // {
            //     //     ingredient: "abacaxi em conserva",
            //     //     prep_method: "coozida",
            //     //     unit: "colher de café",
            //     //     unit_amount: "1"
            //     // }
            // ],

            ingredients:[],
            ingredient:{},
            substitute_for:null,
            ingredient_groups:[],
            ingredient_group:{},
            prep_methods:[],
            prep_method:{},
            units:[],
            unit:{},
            unit_amount:0,
            newPrepMethodDialog:false,
            newIngredientDialog:false,
            newIngredientGroupDialog:false,
            newUnitDialog:false,
        }
    },
    methods: {
        edit(item){
            console.log(item)
        },
        remove(item){
            this.ingredient_list.splice(this.ingredient_list.indexOf(item),1)
        },
        closeUnitDialog(unit){
            this.loadUnits()
            this.newUnitDialog=false
            this.unit=unit
        },
        closeIngredientDialog(ingredient){
            this.loadIngredients()
            this.newIngredientDialog=false
            this.ingredient=ingredient
            console.log(this.ingredient)

        },
        closeIngredientGroupDialog(group){
            this.loadIngredientGroups()
            this.newIngredientGroupDialog=false
            this.ingredient_group=group
        },
        closePrepMethodDialog(prep_method){
            this.loadPrepMethods()
            this.newPrepMethodDialog=false
            this.prep_method=prep_method
        },
        loadUnits(){
            this.axios.get('units')
                .then(r=>{
                    this.units = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },
        loadIngredients(){
            this.axios.get('ingredients')
                .then(r=>{
                    this.ingredients = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },
        loadIngredientGroups(){
            this.axios.get('ingredient_groups')
                .then(r=>{
                    this.ingredient_groups = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                    this.ingredient_groups.unshift({text:'Nenhum', value:0, id:0})
                })
        },

        loadPrepMethods(){
            this.axios.get('prep_methods')
                .then(r=>{
                    this.prep_methods = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },

        insertIntoIngredientList(){
            // console.log(this.substitute_for)
            let ingredient = this.ingredients.find(i=>{
                    let obj = typeof(this.ingredient)==='object'?this.ingredient.id:this.ingredient
                    return i.id===obj
                })
            let prep_method = this.prep_methods.find(pm=>{
                    let obj = typeof(this.prep_method)==='object'?this.prep_method.id:this.prep_method
                    return pm.id===obj
                })
            let substitute_for = this.substitutes.find(i=>{
                    let obj = typeof(this.substitutes)==='object'?this.substitutes.id:this.substitutes
                    return i.id===obj
                })
            let unit = this.units.find(u=>{
                    let obj = typeof(this.unit)==='object'?this.unit.id:this.unit
                    return u.id===obj
                })
            let ingredient_group = this.ingredient_groups.find(ig=>{
                    let obj = typeof(this.ingredient_group)==='object'?this.ingredient_group.id:this.ingredient_group
                    return ig.id===obj
                })
            console.log(this.ingredient)
            // console.log(ingredient)
            // console.log(ingredient_group)
            // console.log(prep_method)
            // console.log(unit)
            this.ingredient_list.push(
                {
                    ingredient:ingredient.text,
                    ingredient_id: ingredient.id,
                    substitute_for: substitute_for?substitute_for.text:null,
                    substitute_for_id: substitute_for?substitute_for.id:null,
                    prep_method: prep_method.text,
                    prep_method_id: prep_method.id,
                    unit_amount:this.unit_amount,
                    unit:unit.text,
                    unit_id:unit.id,
                    group:ingredient_group.text,
                    group_id:ingredient_group.id,
                    edit:'',
                    delete:'',
                }
            )
            this.ingredient = null
            this.prep_method = null
            this.substitute_for = null
            this.unit = null
            this.ingredient_group = null
        }
    },
    created() {
        this.loadIngredientGroups()
        this.loadIngredients()
        this.loadPrepMethods()
        this.loadUnits()
        // this.substitute_for =

    },
    computed:{
        substitutes(){
            return [{text:'Nenhum', value:null, id:null}, ...this.ingredients]
        }
    }
}
</script>

<style>

</style>
