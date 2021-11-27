<template>
    <v-dialog v-model="show" max-width="80vw">
        <v-card class="blue-grey lighten-3">
            <v-card-title>
                <span class="text-h5">Confirma exclusão do item {{ingredientListItem}}?</span>
            </v-card-title>
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" outlined @click.stop="show = false">
                    Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click.stop="saveAndClose">
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import recipemixin from '@/components/new/recipemixin'
export default {

    props: ['visible','ingredientListItem'],
    mixins: [recipemixin],
    data: () => ({
        valid: true,
        dialog: false,
    }),
    computed: {
        show: {
            get() {
                return this.visible
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        },
    },
    created() {
    },
    mounted() {
        
    },
    methods: {
        saveAndClose() {
            this.show = false
            if (this.pm_id) {
                this.axios.delete(`prep_method_list/${this.id}/${this.pm_id}`)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            }
            this.axios.delete(`ingredient_list/${this.id}`)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}

</script>

<style>

</style>