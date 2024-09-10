import axios from 'axios'
import store from './index'
import { toRaw } from  'vue'

export default {
    namespaced: true, 
    state: {
        subjects: []
    }, 
    getters: {
        // returns all the registered subjects in the store 
        // {{ $store.getters['subject/details'] }}
        details(state) {
            return toRaw(state.subjects)
        },

        // returns a specific subject that is stored in the store 
        // {{ $store.getters['subject/specific']('pvs') }}
        specific: (state) => (val) => {
            return toRaw(state.subjects.find(x => x.code === val))
        }
    },
    actions: {
        // updates a subject information 
        async update({commit}, payload){
            let result = false 
            store.commit('activateLoadingState')
            
            await axios.put(`${import.meta.env.VITE_URI}/subject/${payload.code}`, payload).then(doc => {
                if(doc.data.success !== false){
                    store.dispatch('subject/fetchSubjects')
                    result = true 
                } else {
                    alert(doc.data.error)
                }
            }).catch(err => {
                console.log(err)
                // if(err.response.data.success === false){
                //     alert(err.response.data.error)
                // } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result 
        },
        // fetches subjects from the database and stores them in the store 
        async fetchSubjects({ commit }){
            let result = false 
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/subject`).then(data => {
                if(data.data.success === true){
                    commit('SET_SUBJECTS', data.data.data)
                    result = true
                    store.commit('deactivateLoadingState')
                }
            })
            store.commit('deactivateLoadingState')
            return result 
        },
        // stores a new subject in the subjects database 
        // this.$store.dispatch('subject/createSubject', data)
        async createSubject({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/subject`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('subject/fetchSubjects')
                    result = true 
                } else {
                    alert(data.data.error)
                }
            }).catch(err => {
                if(err.response.data.success === false){
                    alert(err.response.data.error)
                } 
            }).finally(() => {
                store.commit('deactivateLoadingState')
            })

            return result
        },
        // removes subject from the subjects database
        // this.$store.dispatch('subject/removeSubject', 'cvc')
        async removeSubject({ commit }, code){
            let result = false 
            store.commit('activateLoadingState')
            await axios.delete(`${import.meta.env.VITE_URI}/subject/${code}`).then(data => {
                if(data.data.success === true){
                    result = true
                    store.dispatch('subject/fetchSubjects')
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
        SET_SUBJECTS(state, payload){
            state.subjects = payload 
        }
    }
}