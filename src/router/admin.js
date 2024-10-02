import store from "@/store"

export default [
    {
        name: "adBase",
        path: "/ad", 
        // component: AdminBasePage,
        component: () => import("@/pages/admin/AdminBasePage.vue"), 
        beforeEnter: (to, from ,next) => {
            let userAccount = store.state.user.user.account

            if(userAccount == undefined || userAccount == null){
                alert("Not Authenticated yet!")
                store.commit("user/UNSET_USER")
                next({path: "/login"})
            } else {
                if(userAccount.ref_id.toString().substring(7) === "SA" && userAccount.admin_rights == "yes"){
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
                beforeEnter: (to, from, next) => {
                    // ...displays before entering 
                    alert("This Page is still under development. Try again next time!")
                    next(false)
                    store.commit('deactivateLoadingState')
                    
                },
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
                name: "adMyProfile",
                path: ":staffId",
                component: () => import("@/pages/admin/profile_files/AdminProfilePage.vue")
            },
            {
                name: "adStaff", 
                path: "staff", 
                component: () => import("@/pages/admin/staff_files/AdminStaffPage.vue")
            },
            {
                name: "adEditStaff",
                path: "staff/:ref_id",
                component: () => import("@/pages/admin/staff_files/AdminEditStaffPage.vue")
            },
            {
                name: "adCreateStaff",
                path: "staff/create", 
                component: () => import("@/pages/admin/staff_files/AdminCreateStaffPage.vue")
            },
            {
                name: "adStudent",
                path: "student", 
                component: () => import("@/pages/admin/student_files/AdminStudentPage.vue")
            },
            {
                name: "adCreateStudent",
                path: "student/create", 
                component: () => import("@/pages/admin/student_files/AdminCreateStudentPage.vue")
            },
            {
                name: "adEditStudent",
                path: "student/:ref_id",
                component: () => import("@/pages/admin/student_files/AdminEditStudentPage.vue")
            },
            {
                name: "adClass",
                path: "class", 
                component: () => import("@/pages/admin/class_files/AdminClassPage.vue")
            },
            {
                name: "adCreateClass",
                path: "class/create", 
                component: () => import("@/pages/admin/class_files/AdminCreateClassPage.vue")
            },
            {
                name: "adEditClass",
                path: "class/:code", 
                component: () => import("@/pages/admin/class_files/AdminClassEditPage.vue")
            },
            {
                name: "adClassUnclassified",
                path: "class/unclassified", 
                component: () => import("@/pages/admin/class_files/AdminClassUnclassifiedPage.vue")
            },
            {
                name: "adSubject",
                path: "subject", 
                component: () => import("@/pages/admin/subject_files/AdminSubjectPage.vue")
            },
            {
                name: "adCreateSubject",
                path: "subject/create", 
                component: () => import("@/pages/admin/subject_files/AdminSubjectCreatePage.vue")
            },
            {
                name: "adEditSubject",
                path: "subject/:code",
                component: () => import("@/pages/admin/subject_files/AdminSpecificSubjectPage.vue")
            },
            {
                name: "adApplicant", 
                path: "applicant", 
                component: () => import("@/pages/admin/applicant_files/AdminApplicantHomePage.vue")
            },
            {
                name: "adViewApplicant", 
                path: "applicant/:gen_id", 
                component: () => import("@/pages/admin/applicant_files/AdminViewSpecificApplicant.vue")
            },
            {
                name: "adAcademic", 
                path: "academic", 
                component: () => import("@/pages/admin/academic_files/AdminAcademicPage.vue")
            },
            {
                name: "adAcademicSpecific", 
                path: "academic/specific", 
                component: () => import("@/pages/admin/academic_files/AdminAcademicSpecificPage.vue")
            },
            {
                name: "adAcademicCreate", 
                path: "academic/create", 
                component: () => import("@/pages/admin/academic_files/AdminAcademicCreatePage.vue")
            },
            {
                name: "adBill",
                path: "bill", 
                beforeEnter: (to, from, next) => {
                    // ...displays before entering 
                    alert("This Page is still under development. Try again next time!")
                    next(false)
                    store.commit('deactivateLoadingState')
                    
                },
                component: () => import("@/pages/admin/bill_files/AdminBillPage.vue")
            },
            {
                name: "adIncomeAnalysis",
                path: "income-analysis", 
                beforeEnter: (to, from, next) => {
                    // ...displays before entering 
                    alert("This Page is still under development. Try again next time!")
                    next(false)
                    store.commit('deactivateLoadingState')
                    
                },
                component: () => import("@/pages/admin/income_analysis_files/AdminIncomeAnalysisPage.vue")
            },
            {
                name: "adEditSpecificIncomeAnalysis",
                path: "income-analysis/:code", 
                component: () => import("@/pages/admin/income_analysis_files/AdminEditSpecificIncomeAnalysis.vue")
            },
            {
                name: "adCreateIncomeAnalysis",
                path: "income-analysis/create", 
                component: () => import("@/pages/admin/income_analysis_files/AdminCreateAnalysisPage.vue")
            },
        ]
    }
]