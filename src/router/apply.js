import store from "@/store"

export default [
    {
        name: "apply", 
        path: "/apply",
        component: () => import("@/pages/apply/ApplyBasePage.vue"),
        // beforeEnter: (to, from ,next) => {
        //     let userAccount = store.state.user.user.account

        //     if(userAccount == undefined || userAccount == null){
        //         alert("Not Authenticated yet!")
        //         store.commit("user/UNSET_USER")
        //         next({path: "/login"})
        //     } else {
        //         if(userAccount.ref_id.toString().substring(7) === "SU"){
        //             next()
        //         } else {
        //             alert("Not Authenticated yet!")
        //             store.commit("user/UNSET_USER")
        //             next({path: "/login"})
        //         }
        //     }
            
        // },
        children: [
            {
                name: "applyLogin",
                path: "login", 
                component: () => import("@/pages/apply/ApplyLoginPage.vue")
            },
            {
                name: "applyHome",
                path: "applyhome", 
                component: () => import("@/pages/apply/ApplyHomePage.vue")
            }
        ]
    }
]