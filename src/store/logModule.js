import axios from 'axios'
import store from './index'

export default {
    namespaced: true, 
    state: {
        logs: []
    }, 
    getters: {
        // details - returns the whole logs 
        details(state){
            return state.logs
        },
        
        // limitDetails - returns only the first five logs in the array 
        limitDetails(state){
            let result = []
            for(let i=0; i < 5; i++){
                result.push(state.logs[i])
            }
            return result
        }
    }, 
    actions: {
        // fetches the logs from the database and commits them to the store 
        async fetchLogs({ commit }){
            await axios.get(`${import.meta.env.VITE_URI}/log/all`).then(data => {
                if(data.data.success === true){
                    commit('SET_LOGS', data.data.data)
                    store.commit('deactivateLoadingState')
                }
            }).catch(() => {
                setTimeout(() => {
                    alert("Weak Network Connection")
                }, 3000)
            })
        }
    }, 
    mutations: {
        SET_LOGS(state, payload){
            state.logs = payload 
        },
        UNSET_LOGS(state){
            state.logs = null 
        }
    }
}