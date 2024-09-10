import axios from "axios"
import store from "./index"

export default {
    namespaced: true, 
    state: {
        students: []
    }, 
    getters: {
        details(state){
            return state.students
        },
        specific: (state) => (ref_id) => {
            return state.students.find(x => x.account.ref_id === ref_id)
        }
    },
    actions: {
        async fetchStudents({commit}){
            store.commit('activateLoadingState')
            await axios.get(`${import.meta.env.VITE_URI}/student`).then(doc => {
                if(doc.data.success === true){
                    commit('SET_STUDENTS', doc.data.data)
                    store.commit('deactivateLoadingState')
                }else {
                    store.commit('deactivateLoadingState')
                }
            }).catch(err => {
                alert(err)
                store.commit('deactivateLoadingState')
            })
        },
        async create({commit}, payload){
            let result = ""
            store.commit('activateLoadingState')
            await axios.post(`${import.meta.env.VITE_URI}/student`, payload).then(doc => {
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
        },
        async update({commit}, payload){
            let result = ""
            store.commit('activateLoadingState')
            await axios.put(`${import.meta.env.VITE_URI}/student`, payload).then(doc => {
                if(doc.data.success === true){
                    store.dispatch('student/fetchStudents')
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
    },
    mutations: {
        SET_STUDENTS(state, payload){
            state.students = payload 
        },
        UNSET_STUDENTS(state){
            state.students = []
        }
    }
}