<template>
    <div>
       <PageTitleComponent backTo="saHome" title="Subjects Scoresheets" />
        <br /> 
        Staff Subjects Score sheets 
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent}, 
    mounted(){
        this.$store.commit('deactivateLoadingState')
    }
}
</script>