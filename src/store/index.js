import {
  createStore
} from 'vuex'
import {
  getToken,
  setToken
} from '../libs/token';
import {
  login
} from "@/services/login";

export default createStore({
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    // 登录
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code === 200) {
            const token = response.token
            setToken(token) //cookie储存token
            commit('SET_TOKEN', token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  getters: {
    token: state => state.token,
  },
})