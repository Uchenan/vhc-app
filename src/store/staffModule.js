import axios from "axios"
import store from "./index"

export default {
    namespaced: true,
    state: {
        staffs: []
    },
    getters: {
        details(state){
            return state.staffs 
        },
        specific: (state) => (ref_id) => {
            return state.staffs.find(x => x.account.ref_id === ref_id)
        }
    },
    actions: {
        async fetchStaffs({commit}){
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/staff`).then(doc => {
                if(doc.data.success === true){
                    commit('SET_STAFFS', doc.data.data)
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })
        },
        async update({commit}, payload){
            let result = ""
            store.commit('activateLoadingState')
            await axios.put(`${import.meta.env.VITE_URI}/staff`, payload).then(doc => {
                if(doc.data.success === true){
                    store.dispatch('staff/fetchStaffs')
                    result = true 
                    store.commit('deactivateLoadingState')
                } else {
                    result = false 
                }
            }).catch(err => {
                result = false 
                alert(err)
                store.commit('deactivateLoadingState')
            })

            return result 
        },
        async create({commit}, payload){
            let result = ""
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/staff`, payload).then(doc => {
                if(doc.data.success === true){
                    store.commit('deactivateLoadingState')
                    result = doc.data
                } else {
                    store.commit('deactivateLoadingState')
                    result = false 
                }
            }).catch(() => {
                store.commit('deactivateLoadingState')
                result = false 
            })

            return result 
        }
    },
    mutations: {
        SET_STAFFS(state, payload){
            state.staffs = payload 
        },
        UNSET_STAFFS(state){
            state.staffs = []
        }
    }
}