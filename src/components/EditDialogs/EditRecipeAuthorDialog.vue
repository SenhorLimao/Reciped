<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Editar autor</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col>
                    <v-combobox 
                      v-model="new_author" 
                      :items="authors" 
                      label="Autor" 
                      item-text="name" 
                      item-value="id" hide-details>
                    /</v-combobox>
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
    props:['visible', 'recipe', 'author'],
    data: () => ({
        dialog: false,
        new_author:{},
        authors:[],
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
        this.axios.get('/authors').then(response => {
          this.authors = response.data
          this.new_author=this.author
        })
    },
    
    methods: {
        clear(){
            this.name=''
        },
        cancelAndClose(){
            // this.show = false
            this.$emit('close', this.author)
        },
        saveNewAuthor(){
            this.axios.post('/author/save', {name:this.new_author}).then(response => {
                  this.authors.push(response.data)
                  this.new_author=response.data
                })
                .then(() => {
                  this.saveOrUpdateAuthorList('put', `/author_list/${this.recipe.id}`, {
                    author_id:this.new_author.id,
                    recipe_id:this.recipe.id
                  })
                })
        },
        saveOrUpdateAuthorList(method, url, data){
            this.axios({
              method: method,
              url: url,
              data: data
            })
            .then(response => {
                console.log(response)
            })
            
            
            // .put(`/author_list/${this.recipe.id}`, {author_id:this.new_author.id})
            //   .then(response => {
            //     console.log(response)
            //   })
        },
        // Cria um novo autor e fecha o diálogo


        saveAndClose(){
          // TODO: Se novo autor, adiciona no author_list e em authors
          // TODO: Atualizar author_list
          // TODO: Ao inserir valor inexistente no combobox, não atualiza automaticamente new_author
          setTimeout(() => {
            console.log(this.new_author)
            if(this.new_author.id){
              this.saveOrUpdateAuthorList('put',`/author_list/${this.recipe.id}`, {author_id:this.new_author.id})
            }
            else {
              this.saveNewAuthor()
            }
            // this.$emit('save', this.new_author)
            // this.show = false
            this.$emit('close', this.new_author)
          }, 100)
        }
    },
  }
</script>