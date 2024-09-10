<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <i class="mdi mdi-alert-decagram text-primary" style="font-size: 70px"></i>
        <!-- <h3 class="text-2xl font-bold">{{ modal_title }}</h3> -->
        <p class="text-sm text-center">{{ file_body }}</p> 
        <br /> 
        <div>
            <button class="btn-1 px-6 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel mr-2"></i>No</button>
            <button class="btn-1 px-6" @click="$emit('return', true)"><i class="mdi mdi-checkbox-marked-circle mr-2"></i>Yes</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_body'],
    data(){
        return {
            
        }
    },
    computed: {
        
    },

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>