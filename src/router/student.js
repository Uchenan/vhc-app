import store from "@/store"

export default [
    {
        name: "suBase", 
        path: "/su",
        component: () => import("@/pages/student/StudentBasePage.vue"),
        beforeEnter: (to, from ,next) => {
            let userAccount = store.state.user.user.account

            if(userAccount == undefined || userAccount == null){
                alert("Not Authenticated yet!")
                store.commit("user/UNSET_USER")
                next({path: "/login"})
            } else {
                if(userAccount.ref_id.toString().substring(7) === "SU"){
                    next()
                } else {
                    alert("Not Authenticated yet!")
                    store.commit("user/UNSET_USER")
                    next({path: "/login"})
                }
            }
            
        },
        children: [
            {
                name: "suHome",
                path: "", 
                component: () => import("@/pages/student/StudentHomePage.vue")
            },
            {
                name: "suProfile",
                path: ":studentId", 
                component: () => import("@/pages/student/profile_files/StudentProfilePage.vue")
            }
        ]
    }
]