<template>
    <v-container>
      <v-list dark three-line>
          <template v-for="author in authors">
              <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
              <v-list-item :key="author.id" @click="$emit('showAuthor',author)">
                  <v-list-item-avatar>
                      <h2>{{author.id}}</h2>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>{{author.name|uppercase}}</v-list-item-title>
                      <!-- <v-list-item-subtitle>{{resumee(item.instructions)}}</v-list-item-subtitle> -->
                  </v-list-item-content>
              </v-list-item>
          </template>
      </v-list>
  </v-container>
    <!-- <ul>
        <li v-for="author in authors" :key="author.id" @click="$emit('showAuthor',author)" >
            {{author.name}}
        </li>
    </ul> -->
</template>

<script>
export default {
    data() {
        return {
            authors:[]
        }
    },
    created() {
        this.axios.get('authors')
            .then((result) => {
                this.authors = result.data
                console.table(result.data)
            }).catch((err) => {
                console.warn(err)
            });
    },
}
</script>

<style>

</style>