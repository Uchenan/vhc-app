<template>
    <div>
        <div class="bg-primary dark:bg-primarydark px-4 py-2 text-white mb-3 flex items-center">
            <div class="flex flex-col">
                <span class="font-bold">{{ greeter }}</span>
                <span>{{ $store.getters['user/fullName'] }}</span>
            </div>
            <div>
                <router-link
                    class="bg-secondary text-gray-800 rounded-md ml-4 py-2 px-3 text-xl hover:cursor-pointer hover:bg-secondarydark hover:text-white"
                    :to="{name: 'adMyProfile', params: { staffId: $store.getters['user/details'].account.ref_id }}">
                        <i class="mdi mdi-account-eye"></i>
                </router-link> 
            </div>
        </div>

        <AcademicSessionIndiComponent /> 
        

        <div class="mt-2 p-2 ">
            <span class="block text-2xl font-thin border-b-2">Activities</span>
            <div class="flex flex-wrap items-start">
                <NavLinkComponent v-for="(value, index) in navLinks" 
                    :key="index" :icon="value.icon" :name="value.name" :path="value.path" />
            </div>
        </div>

        <div class="mt-8 p-2 ">
            <span class="block text-2xl font-thin border-b-2">Recent Actions 
                <router-link :to="{name: 'adRecentActions'}"><i class="mdi mdi-arrow-right ml-2"></i></router-link> </span>
            <ul class="mt-2">
                <span v-if="logs.length > 0">
                    <li class="p-3 my-3 rounded-md bg-gray-200 dark:bg-gray-700" v-for="(value, index) in logs" :key="index">
                        <div class="border-b-gray border-b-3 text-primarylight">
                            <i class="mdi mdi-radiobox-marked mr-2"></i>
                            <span class="font-medium">{{ value.timestamp}}</span>
                        </div>
                        <div class="px-1">
                            <span>{{ value.message}}</span>
                        </div>
                    </li>
                </span>
                <span v-else class="block text-center mt-3">
                    ----- No Log Data Available -----
                </span>
            </ul>
        </div> 
    </div>
</template>

<script>
import NavLinkComponent from "@/components/NavLinkComponent.vue"
import AcademicSessionIndiComponent from "@/components/AcademicSessionIndiComponent.vue";

export default {
    components: {
        NavLinkComponent, AcademicSessionIndiComponent
    },
    data() {
        return {
            navLinks: [
                {name: "Staffs", path: "adStaff", icon: "human-male-board"},
                {name: "Students", path: "adStudent", icon: "human-male-board"},
                {name: "Classes", path: "adClass", icon: "google-classroom"},
                {name: "Subjects", path: "adSubject", icon: "book-education"},
                {name: "Applicants", path: "adApplicant", icon: "account-file"},
                {name: "Academic Sessions", path: "adAcademic", icon: "school"}, 
                {name: "Bills", path: "adBill", icon: "script-text-outline"},
                {name: "Transfer Instruction", path: "adInstruction", icon: "script-text-outline"},
                {name: "Income Analysis", path: "adIncomeAnalysis", icon: "finance"},
                {name: "Logout", path: "logout", icon: "logout"},
            ],
            logs: []
        }
    },
    computed: {
        greeter(){
            let d = new Date()
            d = d.getHours()
            if(d >= 0 && d <=12){
                return "Good Morning"
            } else if(d > 12 && d <= 16){
                return "Good Afternoon"
            } else {
                return "Good Evening"
            }
        },
        admin(){
            let res = this.$store.getters['user/details']
        }
    },
    mounted() {
        // this.logs = this.$store.getters['log/details']
        this.$store.dispatch('session/fetchSessions')
        this.$store.commit('deactivateLoadingState')
    }
}
</script>

<style scoped>

</style> 