import axios from "axios"
import store from "./index"

export default {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {
        details(state){
            return state.user
        },
        fullName(state){
            return `${state.user.bio.title} ${state.user.bio.surname} ${state.user.bio.other_names}`
        },
        fullNameStudent(state){
            return `${state.user.bio.surname} ${state.user.bio.other_names}`
        }
    },
    actions: {
        // updates the user data in the database and returns the updated data
        async update({commit}, payload){
            store.commit('activateLoadingState')

            let searchStr = "", returnStr = ""
            const userIdentity = payload.account.ref_id.toString().substr(7) || ""
            
            // determine the URI parameter for reaching out to the database
            if(userIdentity == "SA"){
                searchStr = `${import.meta.env.VITE_URI}/staff`
                returnStr = `${import.meta.env.VITE_URI}/staff/${payload.account.ref_id}`
            } else if(userIdentity == "SU"){
                searchStr = `${import.meta.env.VITE_URI}/student`
                returnStr = `${import.meta.env.VITE_URI}/student/${payload.account.ref_id}`
            } else {
                return
            }

            const res = await axios.put(searchStr, payload).then(doc => {
                axios.get(returnStr).then(doc => {
                    if(doc.data.success == true){
                        commit('SET_USER', doc.data.data)
                    }
                }).catch(() => {
                    return false 
                })
                return true
            }).catch(() => {
                return false 
            })
            store.commit('deactivateLoadingState')

            return res
        },

        //authenticates and sets the user information
        async authenticateUser({commit}, payload){
            store.commit('activateLoadingState')

            let searchStr = ""
            const userIdentity = payload.ref_id.toString().substr(7)

            
            // search the URI parameter for search and authenticating API
            if(userIdentity == "SA"){
                searchStr = `${import.meta.env.VITE_URI}/auth/staff`
            } else if(userIdentity == "SU"){
                searchStr = `${import.meta.env.VITE_URI}/auth/student`
            } else {
                return
            }
            
            
            const res = await axios.post(searchStr, payload).then(doc => {
                if(doc.data.success === false){
                    store.commit('deactivateLoadingState')
                    return false 
                } else {
                    commit('SET_USER', doc.data.data)
                    store.commit('token/SET_TOKEN', doc.headers.vhc_token)
                    store.commit('deactivateLoadingState')
                    return true 
                }
            }).catch(err => {
                store.commit('deactivateLoadingState')
                return "ERR_NET"
            })

            return res
        }
    },
    mutations: { 
        SET_USER(state, payload){
            state.user = payload
        },
        UNSET_USER(state){
            state.user = {}
        }
    }
}