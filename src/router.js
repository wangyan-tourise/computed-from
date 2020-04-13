import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('./components/home/index.vue')


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
					component: Home,
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
