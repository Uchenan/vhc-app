<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Manage Academic Sessions" />
        <br /> 

        <h2 class="text-center text-secondary border-b">Created Sessions</h2>
        
        <router-link class="btn-1 block w-max text-xs px-4 my-2" :to="{name: 'adAcademicCreate'}"><i class="mdi mdi-plus"></i> NEW SESSION</router-link>
        
        <div v-if="sessions.length > 0">
            <!-- LISTING ALL THE CREATED SESSIONS  -->
            <router-link v-for="(value, index) in sessions" :to="{name: 'adAcademicSpecific', query: {name: value.name}}"
                :key="index"
                :class="(value.active === true)? 'items-center flex block px-3 py-4 rounded-md border text-green-700 bg-green-100 my-4' : 'items-center flex block px-3 py-4 rounded-md border bg-gray-100 my-4' ">
                <i class="block mdi mdi-radiobox-marked mr-2"></i>
                <div class="flex flex-col">
                    <span> {{ value.name }}</span>
                    <span class="text-xs font-italics">{{ (value.active === true)? '(Currently Active)' : '(Inactive)' }}</span>
                </div>
            </router-link>
        </div>

        <div v-else>
            <span class="block text-center my-4">----- No registered Academic session -----</span>
        </div>
    </div> 
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    data(){
        return {
            sessions: []
        }
    },
    components: {PageTitleComponent},
    mounted() {
        this.$store.dispatch('session/fetchSessions').then(() => {
            this.sessions = this.$store.getters['session/details']
            this.$store.commit('deactivateLoadingState')
        })
    },
    
}
</script>