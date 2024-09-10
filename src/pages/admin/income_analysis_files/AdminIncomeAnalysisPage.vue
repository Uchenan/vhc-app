<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Income Analysis" />
        <router-link :to="{name: 'adCreateIncomeAnalysis'}" class="py-2 px-4 bg-primary text-white rounded-lg mr-2 hover:text-white"> <i class="mdi mdi-plus"></i> New Analysis </router-link>
        <button class="py-2 px-4 bg-secondary rounded-lg mr-2"> <i class="mdi mdi-view-grid"></i> Overview </button>

        <h1 class="text-2xl font-thin mt-6 pb-1 border-b">Ongoing Analysis</h1>
        <router-link :to="{name: 'adEditSpecificIncomeAnalysis', params: {code: 'first'}}" class="block p-3 my-3 rounded-md bg-gray-200 dark:bg-gray-700">
            <i class="mdi mdi-radiobox-blank mr-2"></i> 2023/2024 JSS 1 3RD TERM 
        </router-link>
        <router-link :to="{name: 'adEditSpecificIncomeAnalysis', params: {code: 'second'}}" class="block p-3 my-3 rounded-md bg-gray-200 dark:bg-gray-700">
            <i class="mdi mdi-radiobox-blank mr-2"></i> 2023/2024 JSS 1 3RD TERM 
        </router-link>


        <h1 class="text-2xl font-thin mt-6  pb-1 border-b">Archived Analysis</h1>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent}, 
    mounted(){
        this.$store.commit('deactivateLoadingState')
    },
}
</script>