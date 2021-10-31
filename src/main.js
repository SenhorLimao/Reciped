import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

Vue.filter('uppercase',
	v=> v.toUpperCase()
)


// var Datastore = require('nedb')

// You can issue commands right away
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
