import store from "@/store"

export default [
    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/imp/LoginPage.vue"),
        beforeEnter: (to, from, next) => {
            let position = ""
            let user = store.state.user.user
            
            if(Object.keys(user).length > 0){
                position = user.account.ref_id.toString().substr(7)
                if(position === "SA" && user.account.admin_rights == "yes"){
                    next({name: "adHome"})
                } else if(position === "SU"){
                    next({name: "suHome"})
                } else if(position === "SA"){
                    next({name: "saHome"})
                } else {
                    alert("Not Authenticated yet!")
                    store.commit("user/UNSET_USER")
                    store.commit("deactivateLoadingState")
                    next({path: "/login"})
                }
            }
            next()
        }
    },
    {
        name: "generateInstruction",
        path: "/generate-instruction",
        component: () => import("@/pages/imp/InstructionTemplatePage.vue")
    },
    {
        name: "test",
        path: "/test", 
        component: () => import("@/testers/ApiTest.vue")
    },
    {
        name: "logout",
        path: "/logout",
        component: () => import("@/pages/imp/LogoutPage.vue"),
        beforeEnter: (to, from, next) => {
            let user = store.state.user.user
            if(Object.keys(user).length === 0){
                alert("Not Authenticated yet!")
                store.commit("user/UNSET_USER")
                store.commit("deactivateLoadingState")
                next({path: "/login"})
            } else {
                next()
            }
        }
    }

]