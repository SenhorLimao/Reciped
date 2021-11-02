<template>
    <v-container grid-list-md>
        <v-card dark>
          <v-stepper dark v-model="e1">
              <v-stepper-header>
                  <template v-for="n in steps">
                      <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n" editable>
                          {{ titles[n-1] }}
                      </v-stepper-step>
                      <v-divider v-if="n !== steps" :key="n"></v-divider>
                  </template>
              </v-stepper-header>
              <v-stepper-items>
                  <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
                      <v-card dark class="mb-12">
                          <component :is="`recipe-step-${n}`" :ref="`step${n}`"></component>
                      </v-card>
                      <div class="d-flex justify-space-between">
                        <v-btn color="warning">
                            Cancelar
                        </v-btn>
                        <v-btn v-if="n==4" color="success" @click="saveRecipe" :disabled="notFilled">
                            Salvar
                        </v-btn>
                        <v-btn v-else color="primary" @click="nextStep(n)">
                            Continuar
                        </v-btn>
                      </div>
                  </v-stepper-content>
              </v-stepper-items>
          </v-stepper>
        </v-card>
    </v-container>
</template>

<script>
import RecipeStep1 from './recipesteps/RecipeStep1.vue'
import RecipeStep2 from './recipesteps/RecipeStep2.vue'
import RecipeStep3 from './recipesteps/RecipeStep3.vue'
import RecipeStep4 from './recipesteps/RecipeStep4.vue'
import { mapGetters } from 'vuex'
import RecipeMixin from './recipemixin'
export default {
  mixins: [RecipeMixin],
  components: { RecipeStep1, RecipeStep2, RecipeStep3, RecipeStep4 },
    data () {
      return {
        // e1: 1,
        // steps: 4,
        // titles: ['Título, Autor, Rendimento, Categoria',
        //           'Lista de Ingredientes',
        //           'Instruções',
        //           'Review']
      }
    },
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },

    computed: {
      notFilled(){
        
        let recipeNotFilled = !(!!this.getRecipe.title &&
                 !!this.getRecipe.prep_time &&
                 !!this.getRecipe.yield_amount &&
                 !!this.getRecipe.yield_type_id &&
                 !!this.getRecipe.instructions)
        
        let ingredientListNotFilled = this.getIngredientList.length == 0

        let categoryNotFilled = !this.getCategory.id

        let authorNotFilled = !this.getAuthor.id

        console.log('falsies Recipe,IngredientList,Category,Author',
          recipeNotFilled, 
          ingredientListNotFilled, 
          categoryNotFilled, 
          authorNotFilled)

        return recipeNotFilled || ingredientListNotFilled || categoryNotFilled || authorNotFilled
        // return !(!!this.getRecipe.title &&
        //          !!this.getRecipe.prep_time &&
        //          !!this.getRecipe.yield_amount &&
        //          !!this.getRecipe.yield_type_id &&
        //          !!this.getRecipe.instructions)
      },
      
      ...mapGetters([
        'getStepperTitles',
        'getStepperSteps',
        'getStepperActualStep'
      ])
    },
    methods: {
      nextStep (n) {
        // this.$store.state.recipe.yield_type_id=this.$store.state.yield_type.id?this.$store.state.yield_type.id:null
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      save(){
        console.log(this.$refs.step1[0].title)
        console.log(this.$refs.step1[0].author)
      }
    },
    created() {
    },
  }
</script>

<style>

</style>