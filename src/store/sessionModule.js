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
        // locks or unlocks a term in the session 
        async term_guard({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.put(`${import.meta.env.VITE_URI}/session/term-guard`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('session/fetchSessions')
                    result = true 
                } else {
                    result = data.data.error
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    result = err.response.data.error
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })
            return result
        },

        // activates a term in the session and deactivates others 
        async activate_term({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/session/term-activate`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('session/fetchSessions')
                    result = true 
                } else {
                    result = data.data.error
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    result = err.response.data.error
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result
        },
        // deactivates a session in the database
        async deactivate({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/session/deactivate`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('session/fetchSessions')
                    result = true 
                } else {
                    result = data.data.error
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    result = err.response.data.error
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result
        },

        // activates a session in the database
        async activate({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/session/activate`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('session/fetchSessions')
                    result = true 
                } else {
                    result = data.data.error
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    result = err.response.data.error
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result
        },

        // creates a new session in the database 
        async create({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/session`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('session/fetchSessions')
                    result = true 
                } else {
                    result = data.data.error
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    result = err.response.data.error
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result
        },

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