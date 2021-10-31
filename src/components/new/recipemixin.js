import { mapGetters } from 'vuex'
export default {
    data:()=>({

    }),
    computed: {
        recipe_id:{
            get(){return this.getRecipe.id},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'id'})}
        },
        title:{
            get(){return this.getRecipe.title},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'title'})}
        },
        yield_amount:{
            get(){return this.getRecipe.yield_amount},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'yield_amount'})}
        },
        yield_type:{
            get(){return this.getYieldType},
            set(value){
                // this.$store.commit('setRecipeProp',{value:value.id,prop:'yield_type_id'})
                this.$store.commit('setYieldType',value)
            }
        },
        category:{
            get(){return this.getCategory},
            set(value){this.$store.commit('setCategory',value)}
        },
        author:{
            get(){return this.getAuthor},
            set(value){this.$store.commit('setAuthor',value)}
        },
        ingredient_list: {
            get(){return this.getIngredientList},
            set(value){this.$store.commit('setIngredientList',value)}
        },
        ingredient_list_header: {
            get(){return this.getIngredientListHeader},
            set(value){this.$store.commit('setIngredientListHeader',value)}
        },
        instructions: {
            get(){return this.getRecipe.instructions},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'instructions'})}
        },
        prep_time: {
            get(){return this.getRecipe.prep_time},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'prep_time'})}
        },
        steps:{
            get(){return this.getStepperSteps},
            set(value){this.$store.commit('setStepperSteps',value)}
        }, 
        titles:{
                get(){return this.getStepperTitles},
                set(value){this.$store.commit('setStepperTitles',value)}
        },
        e1:{
                get(){return this.getStepperActualStep},
                set(value){this.$store.commit('setStepperActualStep',value)}
        },
        ...mapGetters([
            'getRecipe',
            'getCategory',
            'getYieldType',
            'getAuthor',
            'getIngredientList',
            'getIngredientListHeader',
            'getPrepMethod',
            'getStepperTitles',
            'getStepperSteps',
        ])
        
    },
    methods: {
        saveIngredientList(){
            this.getIngredientList.forEach(element => {
                element.recipe_id = this.recipe_id
                this.axios.post('ingredient_list/save', element)
                    .then(r=>console.log(r.data))
            });
        },
        saveAuthorList(){
            this.axios.post('author_list/save',
                {author_id:this.getAuthor.id,recipe_id:this.recipe_id})
                .then(r=>console.log(r.data))
        },
        saveCategoryList(){
            this.axios.post('category_list/save',
                {category_id:this.getCategory.id,recipe_id:this.recipe_id})
                .then(r=>console.log(r.data))
        },
        saveRecipe(){
            // save recipe
            // save ingredient_list
            // save author_list
            // save category_list
            this.axios.post('recipe/save',this.getRecipe)
                .then((r)=>this.recipe_id = r.data.id)
                .then(()=>this.saveIngredientList())
                .then(()=>this.saveCategoryList())
                .then(()=>this.saveAuthorList())
                .catch(err=>console.error(err))
        }
    },
}