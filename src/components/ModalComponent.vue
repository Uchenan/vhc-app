<template>
    <div class="absolute bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 z-40">
        <i :class="icon_type" style="font-size: 70px"></i>
        <h3 class="text-2xl font-bold">{{ modal_title }}</h3>
        <p class="text-sm text-center">{{ modal_body }}</p> 
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['modal_type', 'modal_body'],
    data(){
        return {
            modal_title: "Unspecified"
        }
    },
    computed: {
        icon_type(){
            if(this.modal_type === "info"){
                this.modal_title = "Info!"
                return "mdi mdi-information-variant-circle text-sky-400"
            } else if(this.modal_type === "success") {
                this.modal_title = "Success!"
                return "mdi mdi-check-circle text-green-400"
            } else if(this.modal_type === "failed"){
                this.modal_title = "Failed!"
                return "mdi mdi-close-circle text-rose-600"
            } else if(this.modal_type === "warning") {
                this.modal_title = "Warning!"
                return "mdi mdi-shield-alert text-yellow-600"
            } else {
                return "mdi mdi-set-none text-gray-300"
            }
        }
    },

}
</script>

<style scoped>
.tweak {

}
</style>