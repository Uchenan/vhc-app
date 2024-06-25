<template>
    <div>
        <LoadingComponent v-if="loadingState" /> 
        <router-view></router-view>
    </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue"

export default {
    components: {
        LoadingComponent 
    }, 
    computed: {
        loadingState(){
            return this.$store.state.loadingState
        }
    },
}
</script>

<style scoped>

</style>
