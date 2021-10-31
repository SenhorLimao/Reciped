<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Nova Categoria</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="11">
                  <v-select label="Categoria Pai" v-model="category_father" :items="categories_list">
                  </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"

              >
                <v-text-field
                  label="Nome"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            outlined
            @click.stop="show = false"
          >
            Cancelar
          </v-btn>
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
    props:['visible', 'categories'],
    data: () => ({
      dialog: false,
      name:'',
      category_father:{},
      categories_list:{}
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
        console.table(this.categories)
        this.categories_list=[{text:"Nenhuma",value:null}, ...this.categories]
    },
    methods: {
        saveAndClose(){
            let data = {name:this.name, parent_id:this.category_father}
            console.table(data)
            this.axios.post('category/save',data)
                .then((result) => {
                    console.log(result.data)
                }).catch((err) => {
                    console.error(err)
                })
                .finally(()=>this.$emit('close'));
        }
    },
  }
</script>