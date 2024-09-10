// USEFUL LIBRARIES 
import { createStore } from 'vuex'
import VuexPersister from "vuex-persister"

// USEFUL MODULES 
import userModule from "./userModule"
import staffModule from "./staffModule"
import studentModule from './studentModule'
import logModule from './logModule'
import subjectModule from './subjectModule'
import subjectPackageModule from './subjectPackageModule'
import tokenModule from './tokenModule'
import applicantModule from './applicantModule'
import levelModule from './levelModule'
import importantModule from './importantModule'

const vuexPersister = new VuexPersister({
    key: "vhc",
    // statesToPersist: ["loadingState", "user", "staff", "log", "subject"],
    overwrite: true, 
    storage: sessionStorage,
})

const store = createStore({
    state: {
        loadingState: false,
    },
    mutations: {
        activateLoadingState(state){
            state.loadingState = true 
        },
        deactivateLoadingState(state){
            state.loadingState = false 
        },
    }, 
    modules: {
        user: userModule,
        staff: staffModule,
        log: logModule,
        subject: subjectModule,
        subjectPackage: subjectPackageModule, 
        token: tokenModule,
        student: studentModule,
        applicant: applicantModule,
        important: importantModule,
        level: levelModule

    },
    plugins: [
        vuexPersister.persist
    ],
    strict: true
})

vuexPersister.persist(store)

export default store
