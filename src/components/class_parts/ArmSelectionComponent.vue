<template>
    <div class="bg-white p-5 rounded-xl shadow-2xl w-4/5 md:w-3/5 lg:w-2/5 tweak">
        <h3 class="text-lg font-bold border-b mb-2"><i class="mdi mdi-plus-circle"></i> Add New Arm</h3>
        
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Arm Name / Department </span>
            <input type="text" class="input-type-1" v-model="arm.department" />
        </label>
        
        <label class="my-2">
            <span class="block font-medium text-slate-700 text-sm dark:text-white">Subject Package</span>
            <select class="input-type-1" v-model="arm.subjectPackage">
                <option v-for="(value, index) in allSubjectPackages" :key="index" :value="value.name" >
                    {{ value.name }}
                </option>
            </select>
        </label>

        <br /> 
        <div class="border-t w-full flex justify-end py-2">
            <button class="btn-1 px-6 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-close mr-2"></i>Cancel</button>
            <button class="btn-1 px-6" @click="$emit('return', arm)"><i class="mdi mdi-check mr-2"></i>Add</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    props: ['allSubjectPackages'],
    data(){
        return {
            arm: {
                department: "", 
                subjectPackage: ""
            }   
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