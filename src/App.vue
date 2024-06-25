<template>
    <div>
        <LoadingComponent v-if="loadingState" /> 
        <h1>Hello World</h1>
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
