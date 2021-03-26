import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import './plugins/moment'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  mounted(){

    setInterval(function() {
      store.dispatch('decrementTime');
    },1000)
  },
  store,
  render: h => h(App)
}).$mount('#app')
