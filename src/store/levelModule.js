import axios from 'axios'
import store from './index'

export default {
    namespaced: true,
    state: {
        levels: []
    },
    getters: {
        // returns all the registered levels in the store 
        details(state){
            return state.levels 
        },

        // returns a specific level that is stored in the store 
        specific: (state) => (val) => {
            return state.levels.find(x => x.code === val)
        }
    }, 
    actions: {
        // fetches levels from the database and stores them in the store 
        async fetchLevels({ commit }){
            let result = false 
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/level`).then(data => {
                if(data.data.success === true){
                    commit('SET_LEVELS', data.data.data)
                    result = true
                    store.commit('deactivateLoadingState')
                }
            })
            store.commit('deactivateLoadingState')
            return result 
        },

        // stores a new level in the subjects database 
        // this.$store.dispatch('subject/createSubject', data)
        async create({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/level`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('subjectPackage/fetchSubjectPackage')
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

        // updates the level information in the database 
        async update({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.put(`${import.meta.env.VITE_URI}/level/${payload.code}`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('subjectPackage/fetchSubjectPackage')
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
        async removeLevel({ commit }, code){
            let result = false 
            store.commit('activateLoadingState')
            await axios.delete(`${import.meta.env.VITE_URI}/level/${code}`).then(data => {
                if(data.data.success === true){
                    result = true
                    store.dispatch('level/fetchLevels')
                } else {
                    alert("An internal error occurred")
                }
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result 
        }
    },
    mutations: {
        SET_LEVELS(state, payload){
            state.levels = payload 
        }
    }
}