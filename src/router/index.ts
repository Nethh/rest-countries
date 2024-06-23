import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';

// simplify import path
const page: any = (path: string) => () => import(`@/pages/${path}`).then(m => m.default || m)

const routes: Array<RouteRecordRaw> = [
	{
		name: 'countries',
		path: '/',
		component: page('countries.vue')
	}
]

const router: Router = createRouter({
	history: createWebHistory(),
	routes
});

export default router
