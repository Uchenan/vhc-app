import axios from "axios"
import store from "./index"

export default {
    namespaced: true,
    state: {
        applicant: {}
    }, 
    getters: {
        details(state){
            return state.applicant 
        },
        specific: (state) => (gen_id) => {
            return state.applicant.find(x => x.gen_id === gen_id)
        }
    },
    actions: {
        async changeAndUpdate({commit, state}, payload){
            let result = false 
            let applicant = state.applicant.find(x => x.gen_id === payload.gen_id)
            applicant = payload 

            await axios.put(`${import.meta.env.VITE_URI}/applicant`, applicant).then(doc => {
                console.log(doc)
                if(doc.data.success === true){
                    store.dispatch('applicant/fetchApplicants')
                    let result = true 
                }
            })
            
            return result 

        },
        async fetchApplicants({commit}){
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/applicant`).then(doc => {
                if(doc.data.success === true){
                    commit('SET_APPLICANT', doc.data.data)
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })
        },
        async createNewEntry({commit}){
            let result = false 
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/applicant`).then(doc => {
                if(doc.data.success === true){
                    store.dispatch('applicant/fetchApplicants')
                    result = true
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })

            return result
        },
        async deleteEntry({commit}, payload){
            let result = false 
            store.commit('activateLoadingState')
            console.log(payload)
            await axios.post(`${import.meta.env.VITE_URI}/applicant/delete`, payload).then(doc => {
                console.log(doc)
                if(doc.data.success === true){
                    store.dispatch('applicant/fetchApplicants')
                    result = true
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })

            return result
        },
        async authenticateApplicant({commit}, payload){
            let result = false 
            store.commit('activateLoadingState')
            console.log(payload)
            await axios.post(`${import.meta.env.VITE_URI}/applicant/specific`, payload).then(doc => {
                console.log(doc)
                if(doc.data.success === true){
                    commit('SET_APPLICANT', doc.data.data)
                    result = true 
                    store.commit('deactivateLoadingState')
                }else {
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })

            return result 
        },

        // updates the applicant data in the database and returns the updated data
        async update({commit, state}){
            let result = false 
            store.commit('activateLoadingState')
            
            await axios.put(`${import.meta.env.VITE_URI}/applicant`, state.applicant).then(doc => {
                console.log(doc)
                if(doc.data.success === true){

                    axios.post(`${import.meta.env.VITE_URI}/applicant/specific`, {
                        gen_id: state.applicant.gen_id,
                        pin: state.applicant.pin
                    }).then(doc => {
                        commit('SET_APPLICANT', doc.data.data)
                        result = true 
                        store.commit('deactivateLoadingState')
                    })
                    result = true 
                    store.commit('deactivateLoadingState')
                }else {
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })

            return result 
            
        }
    },
    mutations: {
        SET_APPLICANT(state, payload){
            state.applicant = payload 
        },
        UNSET_APPLICANT(state){
            state.applicant = {}
        },
        SET_REVIEW_STATE(state, payload){
            
        }
    }
}
