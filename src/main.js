import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import elementUI from 'element-ui'
import './assets/begin.css' 


Vue.use(router)
Vue.use(store)
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
