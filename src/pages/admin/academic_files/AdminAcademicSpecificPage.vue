<template>
    <div>
        Specific Academic Page {{ $route.query.name }}
    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.commit('deactivateLoadingState')
    }
}
</script>