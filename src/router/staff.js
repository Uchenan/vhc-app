import store from "@/store"

export default [
    {
        name: "saBase", 
        path: "/sa",
        component: () => import("@/pages/staff/StaffBasePage.vue"),
        beforeEnter: (to, from ,next) => {
            let userAccount = store.state.user.user.account

            if(userAccount == undefined || userAccount == null){
                alert("Not Authenticated yet!")
                store.commit("user/UNSET_USER")
                next({path: "/login"})
            } else {
                if(userAccount.ref_id.toString().substring(7) === "SA" && userAccount.admin_rights == "no"){
                    if(userAccount.disable_acct == "yes"){
                        alert("Account Disabled!")
                        store.commit("user/UNSET_USER")
                        store.commit("token/UNSET_TOKEN")
                        store.commit('staff/UNSET_STAFFS')
                        next({path: "/login"})
                    } else {
                        next()
                    }
                } else {
                    alert("Not Authenticated yet!")
                    store.commit("user/UNSET_USER")
                    store.commit("token/UNSET_TOKEN")
                    store.commit('staff/UNSET_STAFFS')
                    next({path: "/login"})
                }
            }
            
        },
        children: [
            {
                name: "saHome",
                path: "", 
                component: () => import("@/pages/staff/StaffHomePage.vue")
            },
            {
                name: "saProfile",
                path: ":staffId", 
                component: () => import("@/pages/staff/profile_files/StaffProfilePage.vue")
            },
            {
                name: "saClassroom", 
                path: "classroom", 
                component: () => import("@/pages/staff/classroom_files/StaffClassroomPage.vue")
            },
            {
                name: "saScoresheet", 
                path: "score-sheet", 
                component: () => import("@/pages/staff/scoresheet_files/StaffScoresheetPage.vue")
            }
        ]
    }
]