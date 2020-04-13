import Vue from 'vue';
import Router from 'vue-router';
// import App from './App';


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/home',
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('./components/home/index.vue')
				},
				{
					path: '/business',
					name: 'business',
					component: () => import('./components/business/index.vue')
				}
			],
		},
	]
})
