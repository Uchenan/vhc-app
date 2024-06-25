import { getAllStaffs } from "@/services/staff.service"


export default {
    namespaced: true,
    state(){
        return {
            staffs: []
        }
    },
    getters: {
        getStaffs(state){
            return state.staffs
        },
    },
    mutations: {
        setStaffs(state, payload){
            state.staffs = payload 
        }
    },
    actions: {
        fetchStaffsFromDb({commit}){
            return new Promise((resolve, reject) => {
                getAllStaffs().then(doc => {
                    if(doc === "nil"){
                        setTimeout(() => {
                            alert("Weak Network Connection")
                            reject("error")
                        }, 3000)
                    } else {
                        commit('setStaffs', doc)
                        resolve()
                    }
        
                })
            })
        }
    }
}