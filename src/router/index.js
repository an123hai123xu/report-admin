import Vue from 'vue';
import store from '@/store'
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        // children: [{
        // path: '/login',
        // name: 'Login',
        // component: () =>
        //     import ( /* webpackChunkName: "about" */ '../views/login/login.vue')
        // }]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/login.vue')
    }
]

const router = new VueRouter({
    routes
})

// 路由守卫

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.user.loginStatus) next({ name: 'Login' })
    else next()
})

export default router