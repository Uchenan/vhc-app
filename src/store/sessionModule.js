import axios from 'axios'
import store from './index'

export default {
    namespaced: true, 
    state: {
        sessions: []
    }, 
    getters: {
        // returns all rengistered sessions 
        details(state){
            return state.sessions
        },
        // returns a specific session that is stored in the database
        specific: (state) => (val) => {
            return state.sessions.find(x => x.name === val)
        }
    }, 
    actions: {
        // fetches sessions from the database 
        async fetchSessions({ commit }){
            let result = false 
            let doc = []
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/session`).then(data => {
                if(data.data.success === true){
                    doc = data.data.data
                    if(doc.length !== 0){
                        doc.forEach((value, index) => {
                            if(value.active === true){
                                doc.splice(index, 1)
                                doc.unshift(value)
                            }
                        })
                    }
                    
                    commit('SET_SESSIONS', doc)
                    result = true
                    store.commit('deactivateLoadingState')
                }
            })
            store.commit('deactivateLoadingState')
            return result 
        },
    }, 
    mutations: {
        SET_SESSIONS(state, payload){
            state.sessions = payload 
        }
    }
}