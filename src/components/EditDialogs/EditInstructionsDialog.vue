<template>
    <v-dialog v-model="show" max-width="700px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Editar instruções</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

                <!-- Campo de texto com as instruções a serem alteradas -->
                <!-- <v-col cols="9"> -->
                    <v-textarea 
                        outlined 
                        name="input-7-4" 
                        label="Modo de Preparo" 
                        v-model="instructions"
                        >
                    </v-textarea>
                <!-- </v-col> -->
            </v-row>
            <v-row>
                <!-- <v-col cols="3"> -->
                    <v-text-field 
                        label="Tempo de Preparo" 
                        type="time" 
                        v-model="prep_time">
                    </v-text-field>
                <!-- </v-col> -->
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
    props:['visible', 'recipe'],
    data: () => ({
        dialog: false,
        prep_time: '',
        instructions: '',
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
        this.dialog=this.open
        this.instructions = this.recipe.instructions
        this.prep_time = this.recipe.prep_time
    },
    mounted(){
        this.instructions = this.recipe.instructions
        this.prep_time = this.recipe.prep_time
    },
    methods: {
        clear(){
            this.name=''
        },
        cancelAndClose(){
          console.log(this.recipe)
            this.$emit('close', {instructions: this.recipe.instructions, prep_time: this.recipe.prep_time})
            // this.show = false
        },
        // Cria um novo autor e fecha o diálogo
        saveAndClose(){
            this.axios.put(`recipe/${this.recipe.id}`,
                {instructions:this.instructions,
                prep_time:this.prep_time,})
                .then((result) => {
                    // Fecha o diálogo e retorna o autor criado
                    console.log(result)
                    this.$emit('close', {instructions:this.instructions,prep_time:this.prep_time})
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