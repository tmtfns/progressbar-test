import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../pages/Home.vue'),
		},
		{
			path: '/chart',
			name: 'chart',
			component: () => import('../pages/Chart.vue'),
		},
		{
			path: '/canvas',
			name: 'canvas',
			component: () => import('../pages/Canvas.vue'),
		},
	],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	scrollBehavior(to, from, savedPosition) {		
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			};
		}
		return { top: 0 };
	},
});

export default router;
