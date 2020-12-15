import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/engineer/engHomepage.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router