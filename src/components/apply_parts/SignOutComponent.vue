<template>
    <div class="flex flex-col items-center mt-16">
        <div class="text-6xl">
            <i class="mdi mdi-walk"></i>
        </div>
        <p>Logout?</p>
        <div class="mt-5">
            <button @click="cancel" class="px-5 py-1 mx-3 bg-primary text-white rounded-md"><i class="mdi mdi-close-thick"></i> Cancel</button>
            <button @click="proceed" class="px-5 py-1 mx-3 bg-danger text-white rounded-md"><i class="mdi mdi-arrow-right-circle"></i> Proceed</button>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.commit("deactivateLoadingState")
    },
    methods: {
        cancel(){
            this.$emit('no')
        },
        proceed(){
            this.$emit('yes')
        }
    }
}
</script>