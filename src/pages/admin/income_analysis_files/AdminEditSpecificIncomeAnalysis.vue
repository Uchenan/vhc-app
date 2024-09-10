<template>
    <div>
        <PageTitleComponent backTo="adIncomeAnalysis" :title="full_title" />
        Edit specific Income Analysis 
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent}, 
    computed: {
        full_title(){
            return "Income Analysis - " + this.$route.params.code.toString().toUpperCase()
        }
    },
    mounted(){
        this.$store.commit('deactivateLoadingState')
    },
}
</script>