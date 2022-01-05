
<template>
    <v-dialog v-model="show" max-width="700px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Editar rendimento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <!-- Quantidade numérica de rendimento da receita -->
                        <v-col cols="2">
                            <v-text-field 
                                label="Rendimento" 
                                v-model="yield_amount_tmp" 
                                :min="0"
                                type="number">
                            </v-text-field>
                        </v-col>
                        <!-- Seletor do tipo de quantidade do rendimento -->
                        <v-col cols="9">
                            <v-select 
                                label="Quantidade" 
                                return-object 
                                v-model="yield_type_tmp" 
                                :items="yield_type_items"
                                item-text="name" 
                                item-value="id">
                            </v-select>
                        </v-col>
            </v-row>
                  
          </v-container>
          <small>*Requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Cancela o diálogo -->
          <v-btn
            color="blue darken-1"
            outlined
            @click.stop="cancelAndClose"
          >
            Cancelar
          </v-btn>
          <!-- Botão para salvar o autor -->
          <v-btn
            color="blue darken-1"
            text
            @click.stop="saveAndClose"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props:['visible', 'recipe', 'yield_type', 'yield_amount'],
    data: () => ({
        dialog: false,
        yield_type_tmp: {},
        yield_amount_tmp: null,
        yield_type_items:[]
    }),
    computed: {
        show:{
            get() {
                return this.visible
            },
            set(value){
                if(!value){
                    this.$emit('close')
                }
            }
        }
    },
    created() {
      this.axios.get('yield_types')
      .then(response => {
          this.yield_type_items = response.data
          this.yield_type_tmp = this.yield_type
          this.yield_amount_tmp = this.yield_amount
      })
        this.dialog=this.open
        // this.yield_amount = this.recipe.yield_amount
    },
    mounted(){
    },
    methods: {
        clear(){
            this.name=''
        },
        cancelAndClose(){
          console.log(this.recipe)
            this.$emit('close', {yield_type: this.recipe.yield_type, yield_amount: this.recipe.yield_amount})
            // this.show = false
        },
        // Cria um novo autor e fecha o diálogo
        saveAndClose(){
            this.axios.put(`recipe/${this.recipe.id}`,
                {yield_type:this.yield_type,
                yield_amount:this.yield_amount,})
                .then((result) => {
                    // Fecha o diálogo e retorna o autor criado
                    console.log(result)
                    this.$emit('close', {yield_type:this.yield_type, yield_amount:this.yield_amount})
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
                // .finally(()=>this.$emit('close', this.author_obj));
        }
    },
  }
</script>