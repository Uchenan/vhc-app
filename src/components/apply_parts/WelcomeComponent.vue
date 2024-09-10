<template>
    <div>
        <div class="flex justify-center flex-col items-center mt-8">
            <i class="mdi mdi-human-greeting-variant text-6xl text-primary"></i>
            <h2 class="text-2xl font-bold text-primary">Nice Job Dear!</h2> 
            <p class="text-center">Remember to save if the information is not complete</p>
            <p class="text-center mb-2">Click on Submit only when all information have been entered</p>
            <p class="font-bold">Always check the red box below for information from the admin after submission</p>
            
            <br />
            <div class="w-full bg-pink-200 text-center rounded-lg p-2">
                <span class="text-danger font-bold">Complete the following before submitting </span> 
                <hr /> 
                <ul v-if="applicant.reverted_messages.length == 0" class="mt-2">
                    <li>
                        <i class="mdi mdi-circle-medium"></i> Fill in all necessary data in the spaces provided 
                    </li>
                </ul>
                <ul v-else  class="mt-2 w-full text-left">
                    <li v-for="(value, index) in applicant.reverted_messages" :key="index" class="my-1">
                        <i class="mdi mdi-circle-medium"></i>{{ value }}
                    </li>
                </ul>
            </div>

            <button class="px-2 my-2 md:px-4 mx-2 py-2 text-sm md:py-1 bg-primary text-white rounded" v-show="!underReview" @click="$emit('submit')">
                <i class="mdi mdi-check-circle-outline mr-2"></i>Submit for Approval 
            </button> 

        </div> 
    </div>
</template>

<script>
export default {
    props: ['underReview'],
    computed: {
        applicant(){
            return this.$store.getters['applicant/details']
        }
    },
    mounted(){

    }
}
</script>