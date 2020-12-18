import Vue from 'vue'
import Vuex from 'vuex'
import userCookie from "../utils/userCookie.js";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //用户基本信息
        user: userCookie.getUserCookie()
    },
    mutations: {
        setUserInfo(state, userinfo) {
            state.user = userinfo;
            userCookie.setCookie(userinfo);
        },
        logout(state) {
            state.user = {
                username: '',
                appkey: '',
                role: '',
                email: ''
            }
        }
    },
    actions: {
        setUserInfo({ commit }, userinfo) {
            commit('setUserInfo', userinfo)
        },
        logout({ commit }) {
            commit('logout');
            userCookie.removeCookie()
        }
    },
    modules: {}
})