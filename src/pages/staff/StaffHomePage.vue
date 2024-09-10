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
                    :to="{name: 'saProfile', params: { staffId: $store.getters['user/details'].account.ref_id }}">
                        <i class="mdi mdi-account-eye"></i>
                </router-link> 
            </div>
        </div>

        <div>
            Disabled Account => {{ $store.getters['user/details'].account.disable_acct }}
        </div>
        

        <div class="mt-2 p-2 ">
            <span class="block text-2xl font-thin border-b-2">Activities</span>
            <div class="flex flex-wrap items-start">
                <NavLinkComponent v-for="(value, index) in navLinks" 
                    :key="index" :icon="value.icon" :name="value.name" :path="value.path" />
            </div>
        </div>

    </div>
</template>

<script>
import NavLinkComponent from "@/components/NavLinkComponent.vue"

export default {
    components: {
        NavLinkComponent
    },
    data() {
        return {
            navLinks: [
                {name: "My Subjects", path: "test", icon: "briefcase"},
                {name: "My Class", path: "test", icon: "google-classroom"},
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
        }
    },
    mounted() {
        this.$store.commit('deactivateLoadingState')
    }
}
</script>

<style scoped>

</style> 