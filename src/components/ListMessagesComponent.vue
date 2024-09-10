<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <!-- <i class="mdi mdi-alert-decagram" style="font-size: 70px"></i> -->
        <h3 class="text-xl text-center font-bold border-b-2 w-full">Steps to be taken</h3>
        <div class="mt-2" v-if="steps.length === 0">
            --- No step included ---
        </div>
        <div v-else class="text-left w-full mt-2">
            <ul>
                <li v-for="(value, index) in steps" :key="index">
                    <i class="mdi mdi-circle-medium"></i> {{ value }}
                </li>
            </ul>
        </div>

        <br />
        <textarea class="input-type-1" v-model="new_step"></textarea>
        <button class=" btn-1 bg-gray-500" v-if="new_step" @click="adder"><i class="mdi mdi-plus"></i>Add</button>
        
        <br /> 
        <div>
            <button class="btn-1 px-6 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel mr-2"></i>Cancel</button>
            <button class="btn-1 px-6" @click="$emit('return', steps)"><i class="mdi mdi-send mr-2"></i>Send</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['file_body'],
    data(){
        return {
            steps: [],
            new_step: ""
        }
    },
    computed: {
        
    },
    methods: {
        adder(){
            this.steps.push(this.new_step)
            this.new_step = ""
        },
        close(){
            
        }
    }

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>