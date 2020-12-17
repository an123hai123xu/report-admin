import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loginStatus: false,
            username: '',
            appkey: '',
            role: '', //角色
            email: ''
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})