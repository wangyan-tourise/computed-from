import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import elementUI from 'element-ui'
import './assets/image/begin.css' 
import './assets/css/init.css'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(router)
Vue.use(store)
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
