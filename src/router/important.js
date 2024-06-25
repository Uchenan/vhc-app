import store from "@/store"

export default [
    {
        name: "mm", 
        path: "/",
        beforeEnter: (to, from ,next) => {
            let user = store.state.user.user
            if(user === null){
                alert("Not Authenticated yet!")
                store.commit("unsetUser")
                next({path: "/login"})
            } else {
                if(user.account.ref_id.toString().substring(7) === "SA"){
                    alert("Authenticated. Welcome dear")
                    next({path: "/ad"})
                } else {
                    next({path: "/test"})
                }
            }
        },
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/imp/LoginPage.vue")
    },
    {
        name: "generateInstruction",
        path: "/generate-instruction",
        component: () => import("@/pages/imp/InstructionTemplatePage.vue")
    },
    {
        name: "test",
        path: "/test", 
        component: () => import("@/pages/imp/TestPage.vue")
    },
    {
        name: "logout",
        path: "/logout",
        component: () => import("@/pages/imp/LogoutPage.vue"),
        beforeEnter: () => {
            let user = store.state.user.user
            if(user === null){
                alert("Not Authenticated yet!")
                store.commit("unsetUser")
                store.commit("deactivateLoadingState")
                next({path: "/login"})
            }
        }
    }

]