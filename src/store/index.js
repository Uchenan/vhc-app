import { createStore } from 'vuex'
import staffsModule from "./staffs"
import userModule from "./user"
import VuexPersister from "vuex-persister"
import SecureLS from "secure-ls"

const SecureStorage = new SecureLS({encodingType: 'aes'})


const vuexPersister = new VuexPersister({
    key: "vhc",
    statesToPersist: ['loadingState', 'user'],
    overwrite: true,
    storage: sessionStorage,
    storage: {
        getItem: (key) => SecureStorage.get(key),
        setItem: (key, value) => SecureStorage.set(key,value),
        removeItem: (key) => SecureStorage.remove(key),
        length: SecureStorage.getAllKeys().length, 
        clear: () => SecureStorage.clear(),
        key: (key) => null
    }

})


export default createStore({
    state: {
        loadingState: false,
        titles: ['Mr.', 'Mrs.', 'Master', 'Ms.'],
        gender: [
            {name: "Male", value: "M"},
            {name: "Female", value: "F"}
        ],
        instruction: {}
    },
    getters: {},
    mutations: {
        activateLoadingState(state){
            state.loadingState = true 
        },
        deactivateLoadingState(state){
            state.loadingState = false 
        },
        setInstruction(state, payload){
            state.instruction = payload 
        },
        unsetInstruction(state) {
            state.instruction = {}
        }
    }, 
    actions: {},
    modules: {
        staffs: staffsModule,
        user: userModule
    },
    plugins: [
        vuexPersister.persist
    ]
})