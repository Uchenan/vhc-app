<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h2 class="text-xl mb-2 border-b-2 w-full font-bold"> Select {{ file_title || "N/A" }}</h2>
        
        <div class="w-full">
            <div class="my-2" v-for="(value, index) in file_list" :key="index" @click="$emit('return', value)">
                <i class="mdi mdi-radiobox-blank mr-2"></i> {{ value.name }}
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_list', 'file_title'],
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