<template>
    <div class="bg-white p-5 rounded-xl flex items-center flex-col shadow-2xl w-4/5 h-4/5 md:w-3/5 lg:w-2/5 tweak scrollbar overflow-y-scroll">
        <h2 class="text-xl mb-2 border-b-2 w-full font-bold">Mark Allocation</h2>
        
        <div class="w-full">
            <div class="border-b border-gray-200 w-full my-2 shadow">
                <table class="divide-y divide-green-400 w-full">
                    <thead  class="bg-gray-100">
                        <tr class="divide-x">
                            <th>Name</th>
                            <th>Mark Obtainable</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="divide-x" v-for="(value, index) in mark_allocation.score_type" :key="index">
                            <td><input type="text" v-model="value.name_of_assessment" class="w-full outline-none text-center p-1" placeholder="e.g. Test 1" maxlength="6" /></td>
                            <td><input type="number" v-model="value.mark_obtainable" class="w-full outline-none text-center p-1" placeholder="e.g. 20%" /></td>
                            <td class="w-100 p-1"><i class="mdi mdi-close text-danger" @click="remove_score_entry(index)"></i></td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="w-full outline-none text-center p-2" colspan="3">
                                Total Score Allocated: {{  total_score }}
                                <button  @click="add_score_entry" class="ml-2 text-xs py-1 px-2 bg-primary rounded text-white ">Add Entry</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Select Classes</span>
                <select class="input-type-1" v-model="mark_allocation.levels_included" multiple>
                    <option v-for="value in allLevels" :key="value.code" :value="value.code">
                        {{ value.name }}
                    </option>
                </select>
            </label>
        </div>

        <div class="w-full flex justify-end">
            <button class="btn-1 bg-danger" @click="$emit('return', false)"><i class="mdi mdi-cancel"></i> Close</button>
            <button class="btn-1 bg-primary" @click="$emit('return', mark_allocation)"><i class="mdi mdi-check"></i> Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    // modal_type detects the type of icon that will be used 
    data(){
        return {
            mark_allocation: {
                levels_included: [], 
                score_type: [
                    {name_of_assessment: '', mark_obtainable: ''}
                ]
            },
            total_score: 0
        }
    },
    watch: {
        "mark_allocation.score_type": {
            handler: function(){
                let res = 0
                this.mark_allocation.score_type.forEach(el => {
                    res += el.mark_obtainable
                })
                this.total_score = res
            }, 
            deep: true 
        }
    },
    computed: {
        allLevels(){
            return this.$store.getters['level/details']
        }
    },
    methods: {
        remove_score_entry(val){
            this.mark_allocation.score_type.splice(val, 1)
        },
        add_score_entry(){
            this.mark_allocation.score_type.push({
                name_of_assessment: '',
                mark_obtainable: ''
            })
        }
    }

}
</script>

<style scoped>
.tweak {
    z-index: 100; 
}
</style>