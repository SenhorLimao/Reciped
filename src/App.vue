<template>
  <v-app class="dark">
    <v-app-bar
      app
      color="blue-grey darken-4"
      dark
    >
      <v-row align-center>
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                @click="selected='new->recipe'"
                v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Nova Receita</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <!-- <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                @click="newRecipe"
                v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Nova Receita</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer> -->
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                  @click="showIndex"
                  v-bind="attrs" v-on="on">
                <v-icon dark>mdi-format-list-bulleted-type</v-icon>
              </v-btn>
            </template>
            <span>Mostrar Índice</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                  @click="showAuthors"
                  v-bind="attrs" v-on="on">
                <v-icon dark>mdi-account-details</v-icon>
              </v-btn>
            </template>
            <span>Listar Autores</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-end">
          <v-text-field
            dense
            filled
            rounded
            solo
            style="margin-bottom: -25px"
            prepend-inner-icon="mdi-magnify"
            color="primary"
            v-model="searchFieldRecipesAndAuthors"
            @keyup="searchRecipesAndAuthors"
          ></v-text-field>

          <div v-if="searching" class="searchResults">
            <ul v-if="authorsSearch.length>0">
              <em>Autores:</em>
              <li v-for="aS in authorsSearch" :key="aS.id"
                @click="searchFieldRecipesAndAuthors='';showAuthor(aS)">{{aS.name}}</li>
            </ul>
            <ul v-if="recipesSearch.length>0">
              <em>Receitas:</em>
              <li v-for="rS in recipesSearch" :key="rS.id"
                @click="searchFieldRecipesAndAuthors='';showRecipe(rS)">{{rS.title}}</li>
            </ul>
          </div>
            <!-- @keyup="searchDebounce" -->
          <!-- <v-text-field
            name="name"
            label="label"
            id="id"
          ></v-text-field>
          <v-btn flat icon color="primary" disabled>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
          <!-- <v-input
            prepend-icon="mdi-magnify"
            type="text"
        >
          <input type="text" name="" id=""> 
        </v-input> -->
        </div>
      </v-row>
    </v-app-bar>

    <v-main class="dark">
        
      <Recipe v-if="selected==='recipe'" :recipe="recipe" @showAuthor="showAuthor($event)" />
      <!-- <hello-world /> -->
      <!-- <NewRecipe v-else-if="selected==='newRecipe'" /> -->
      <index v-else-if="selected==='index'" @showRecipe="showRecipe($event)" />
      <author-list v-else-if="selected==='authors'" @showAuthor="showAuthor($event)" />
      <author v-else-if="selected==='author'" :author="author" @showRecipe="showRecipe($event)" />
      <recipe-stepper v-else-if="selected==='new->recipe'" :author="author" @showRecipe="showRecipe($event)" />

    </v-main>
  </v-app>
</template>

<script>
import Index from './components/Index.vue';
// import NewRecipe from './components/NewRecipe.vue';
import Recipe from './components/Recipe.vue';
import AuthorList from './components/AuthorList.vue';
import Author from './components/Author.vue';
import RecipeStepper from './components/new/RecipeStepper.vue';

export default {
  name: 'App',

  components: {
    Recipe,
    Index,
    // NewRecipe,
    AuthorList,
    Author,
    RecipeStepper,
  },
  data: () => ({
    //
    selected: 'index',
    recipe: {},
    author: {},
    searchFieldRecipesAndAuthors:'',
    timeout: null,
    authorsSearch:[],
    recipesSearch:[],
  }),
  computed:{
    searching(){
      return (this.searchFieldRecipesAndAuthors.length>0)
    }
  },
  methods: {
    newRecipe(){
      this.selected='newRecipe'
    },
    showIndex(){
      this.selected='index'
    },
    showAuthors(){
      this.selected='authors'
    },
    showRecipe(event){
      this.recipe = event
      this.selected="recipe"
    },
    showAuthor(event){
      this.author = event,
      this.selected='author'
    },
    searchDebounce(){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        console.log(this.searchFieldRecipesAndAuthors)
      }, 500);
    },
    searchRecipesAndAuthors(){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.axios.get(`authors/namelike/${this.searchFieldRecipesAndAuthors}`)
          .then((result) => {
            this.authorsSearch=result.data[0]
          }).catch((err) => {
            console.error(err)
          });
        this.axios.get(`recipes/namelike/${this.searchFieldRecipesAndAuthors}`)
          .then((result) => {
            this.recipesSearch=result.data[0]
          }).catch((err) => {
            console.error(err)
          });
      }, 500);
    }
  },
};
</script>
<style scoped>
.dark{
  background-color: dimgray;
}
.searchResults{
  position: absolute;
  top: 55px;
  border: 1px solid gray;
  background-color: #444444;
  border-radius: 15px;
}
.searchResults>ul>li{
  cursor: pointer;
}
.searchResults>ul>li:hover{
  background-color:#8888aa;
  color: black;
}
</style>