import axios from 'axios'
import store from './index'

export default {
    namespaced: true, 
    state: {
        token: ""
    }, 
    getters: {
        details(state){
            return state.token
        },
    },
    mutations: {
        SET_TOKEN(state, payload){
            state.token = payload
        },
        UNSET_TOKEN(state){
            state.token = ""
        }
    }
}