<template>
    <div class="p-3 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-lg my-3">
        <div>
            <i class="mdi mdi-circle-slice-8 mr-2"></i><span>{{ inData.name }}</span>
            <i class="mdi mdi-chevron-down text-xl float-right" v-show="!preview" @click="preview = true"></i>
            <button class="bg-primary text-white py-1 px-2 rounded-sm ml-2 text-lg" v-show="preview" @click="edit = !edit">
                <i :class="(edit)? 'mdi mdi-lock-off-outline' : 'mdi mdi-lock-outline'"></i>
            </button>
        </div>
        <div class="px-4 mt-2" v-show="preview">
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
                <input type="text" class="input-type-1" :disabled="!edit" v-model="inData.name" />
            </label>

            <table class="w-4/5 mx-auto" v-if="inData.payments.length > 0">
                <tr class="text-left" >
                    <th></th>
                    <th>Description</th>
                    <th>Amount (N) </th>
                </tr> 
                <tr v-for="(value, index) in inData.payments" :key="index">
                    <td class="border-b"><i class="mdi mdi-star"></i></td>
                    <td class="border-b">{{ value.name }}</td>
                    <td class="border-b">
                        <input type="number" class="input-type-1 w-auto bg-transparent my-1 p-1" :disabled="!edit" v-model="value.amount" />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><button class="text-white bg-gray-500 w-full text-xl rounded-sm my-2" @click="adder"><i class="mdi mdi-plus"></i></button></td>
                    <td></td>
                </tr>
                <tr class=" my-2">
                    <td></td>
                    <td colspan="2">
                        <button class="btn-1 float-right bg-danger text-white mx-2 px-4 py-2 rounded-md" @click="preview = false"> <i class="mdi mdi-close"></i> Close</button>
                        <button class="btn-1 float-right bg-secondary hover:bg-secondarydark hover:text-white px-4 py-2 rounded-md"> <i class="mdi mdi-update"></i> Update</button>
                    </td>
                </tr>
            </table>

            <table class="w-4/5 mx-auto" v-else>
                <tr>
                    No Bill/Payment Created
                </tr>
            </table>
        </div>
    </div> 
</template>

<script>
export default {
    props: ['inData'],
    data(){
        return {
            edit: false,
            preview: false,
        }
    },
    methods: {
        adder(){
            let refName = prompt("Name of Payment")
            let refAmount = prompt("Amount")

            if(refName && refAmount){
                this.inData.payments.push({name: refName, amount: refAmount})
            } else {
                alert("An error occurred. Cross check inputted data")
            }
        }
    }
}
</script>