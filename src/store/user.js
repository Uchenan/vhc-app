export default {
    state(){
        return {
            user: null
        }
    },
    getters: {
        getUser(state){
            return state.user
        }
    },
    mutations: {
        setUser(state, payload){
            state.user = payload 
        },
        unsetUser(state){
            state.user = null
        }
    }, 
    actions: {}
    
}