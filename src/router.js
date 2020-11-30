import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/home',
			component: () => import('./components/menus.vue'),
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('./components/home/index.vue'),
				}
			],
		},
		{
			path: '/business',
			redirect: '/business/index',
			component: () => import('./components/menus.vue'),
			children: [
				{
					path: '/business/index',
					name: 'business',
					component: () => import('./components/business/index.vue')
				}
			],
		},
		{
			path: '/game',
			redirect: '/game/redVSWhite',
			component: () => import('./components/menus.vue'),
			children: [
				{
					path: '/game/redVSWhite',
					name: 'redVSWhite',
					component: () => import('./components/game/redVSWhite.vue')
				},
				{
					path: '/game/bieQi',
					name: 'bieQi',
					component: () => import('./components/game/bieQi.vue')
				}
			],
		},
		{
			path: '/GuChengShuang',
			name: 'GuChengShuang',
			component: () => import('./components/GuChengShuang/pages/listPage.vue')
		}
	]
})
