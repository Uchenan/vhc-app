import axios from 'axios'
import store from './index'

export default {
    namespaced: true, 
    state: {
        subjectPackage: []
    }, 
    getters: {
        // returns all the registered subject pakages in the store 
        details(state){
            return state.subjectPackage 
        },

        // returns a specific subject that is stored in the store 
        specific: (state) => (val) => {
            return state.subjectsPackage.find(x => x.code === val)
        }
    },
    actions: {
        // updates a subject information 
        async update({commit}, payload){
            let result = false 
            store.commit('activateLoadingState')
            
            await axios.put(`${import.meta.env.VITE_URI}/subject-package/update`, payload).then(doc => {
                if(doc.data.success !== false){
                    store.dispatch('subjectPackage/fetchSubjectPackage')
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
        async fetchSubjectPackage({ commit }){
            let result = false 
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/subject-package`).then(data => {
                if(data.data.success === true){
                    commit('SET_SUBJECT_PACKAGE', data.data.data)
                    result = true
                    store.commit('deactivateLoadingState')
                }
            })
            store.commit('deactivateLoadingState')
            return result 
        },
        // stores a new subject in the subjects database 
        // this.$store.dispatch('subject/createSubject', data)
        async create({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/subject-package`, payload).then(data => {
                if(data.data.success !== false){
                    store.dispatch('subjectPackage/fetchSubjectPackage')
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
        async remove({ commit }, payload){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/subject-package/delete`, payload).then(data => {
                if(data.data.success === true){
                    result = true
                    store.dispatch('subjectPackage/fetchSubjectPackage')
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
        SET_SUBJECT_PACKAGE(state, payload){
            state.subjectPackage = payload
        }
    }
}