<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h2 class="text-xl mb-2">{{ file_title }}</h2>
        <img :src="file_preview" alt="A image to be uploaded" class="w-2/5 h-2/5" />
        <br />
        <!-- <h3 class="text-2xl font-bold">{{ modal_title }}</h3> -->
        <p class="text-sm">{{ file_body }}</p> 
        <br /> 
        <div>
            <button class="btn-1 px-6 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel mr-2"></i>Cancel</button>
            <button class="btn-1 px-6" @click="$emit('return', true)"><i class="mdi mdi-checkbox-marked-circle mr-2"></i>Upload</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_preview', 'file_body', 'file_title'],
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