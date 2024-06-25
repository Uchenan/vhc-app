import store from "@/store"

export default [
    {
        name: "adBase",
        path: "/ad", 
        // component: AdminBasePage,
        component: () => import("@/pages/admin/AdminBasePage.vue"), 
        beforeEnter: (to, from ,next) => {
            let user = store.state.user.user
            if(user === null || user.account.ref_id.toString().substring(7) !== "SA"){
                alert("Not Authenticated yet!")
                store.commit("unsetUser")
                next({path: "/login"})
            } else {
                alert("Authenticated. Welcome dear")
                next()
            }
        },
        children: [
            {
                name: "adHome",
                path: "",
                component: () => import("@/pages/admin/AdminHomePage.vue")
            },
            {
                name: "adRecentActions", 
                path: "recent-actions",
                component: () => import("@/pages/admin/AdminRecentActionsPage.vue")
            },
            {
                name: "adInstruction",
                path: "transfer-instruction",
                component: () => import("@/pages/admin/instruction_files/AdminInstructionPage.vue")
            },
            {
                name: "adRecipientAddress",
                path: "transfer-instruction/addr",
                component: () => import("@/pages/admin/instruction_files/AdminRecipientAddress.vue")
            },
            {
                name:"adShortContent",
                path: "transfer-instruction/short-content",
                component: () => import("@/pages/admin/instruction_files/AdminShortContent.vue")
            },
            {
                name: "adGenerate",
                path: "transfer-instruction/generate",
                component: () => import("@/pages/imp/InstructionTemplatePage.vue")
            },
            {
                name:"adGenerateSuccess",
                path: "transfer-instruction/success",
                component: () => import("@/pages/admin/instruction_files/AdminGenerateSuccessPage.vue")
            },
            {
                name: "adStaff", 
                path: "staff", 
                component: () => import("@/pages/admin/staff_files/AdminStaffPage.vue")
            },
            {
                name: "adEditStaff",
                path: "staff/:staffId",
                component: () => import("@/pages/admin/staff_files/AdminEditStaffPage.vue")
            },
            {
                name: "adCreateStaff",
                path: "staff/create", 
                component: () => import("@/pages/admin/staff_files/AdminCreateStaffPage.vue")
            },
        ]
    }
]