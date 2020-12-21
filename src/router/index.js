import Vue from 'vue';
import store from '@/store'
import VueRouter from 'vue-router';
import getMenuRoute from '@/utils/peimission'
import Home from '../views/layout/Home.vue';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const asyncRouter = [{
    path: '/product',
    name: 'Product',
    meta: {
        title: '商品'
    },
    component: Home,
    children: [{
            path: 'list',
            name: 'ProductList',
            meta: {
                title: '列表'
            },
            component: () =>
                import ('../views/page/productList.vue')
        },
        {
            path: 'add',
            name: 'ProductAdd',
            meta: {
                title: '新增'
            },
            component: () =>
                import ('../views/page/productAdd.vue')
        },
        {
            path: 'category',
            name: 'Catrgory',
            meta: {
                title: '类目管理'
            },
            component: () =>
                import ('../views/page/category.vue')
        }
    ]
}]
const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页'
        },
        children: [{
            path: 'index',
            name: 'Index',
            meta: {
                title: '统计'
            },
            component: () =>
                import ('../views/page/index.vue')
        }]
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

let isAddRoutes = false
    // 路由守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        if (store.state.user.username && store.state.user.appkey && store.state.user.email) {
            if (!isAddRoutes) {
                //进入系统之前配置左侧菜单
                const menuRoute = getMenuRoute(store.state.user.role, asyncRouter);
                router.addRoutes(menuRoute);
                isAddRoutes = true;
                store.dispatch('setMenuRoute', routes.concat(menuRoute))
            }
            next() // 已经是登录状态，不拦截
        } else {
            next({ name: 'Login' }) // 没有登录，去登录界面
        }
    }
    next()
})

export default router