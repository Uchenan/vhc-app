<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Manage Bills" />

        <br />
        <span class="text-2xl font-thin ">Available Bills</span>

        <BillComponent :inData="demoData" /> 


        <br /> <br /><br />
        <hr />
        <div class="p-3 bg-gray-300 rounded-lg my-3">
            <span class="text-2xl font-thin ">Create New Bill</span>
            <div class="px-4 mt-2">
                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Name</span>
                    <input type="text" class="input-type-1" v-model="newBill.name" />
                </label>

                <table class="w-4/5 mx-auto" v-if="newBill.payments.length > 0">
                    <tr class="text-left" >
                        <th></th>
                        <th>Description</th>
                        <th>Amount (N) </th>
                    </tr> 
                    <tr v-for="(value, index) in newBill.payments" :key="index">
                        <td class="border-b"><i class="mdi mdi-star"></i></td>
                        <td class="border-b">{{ value.name }}</td>
                        <td class="border-b">
                            <input type="number" class="input-type-1 w-auto bg-transparent my-1 p-1" v-model="value.amount" />
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
                            <button class="btn-1 float-right bg-primary hover:bg-primarydark text-white px-4 py-2 rounded-md"> <i class="mdi mdi-update"></i> Create</button>
                        </td>
                    </tr>
                </table>

                <table class="w-4/5" v-else>
                    <tr class="text-left" >
                        <th></th>
                        <th>Description</th>
                        <th>Amount (N) </th>
                    </tr> 
                    <tr>
                        <td></td>
                        <td><button class="text-white bg-gray-500 w-full text-xl rounded-sm my-2" @click="adder"><i class="mdi mdi-plus"></i></button></td>
                        <td></td>
                    </tr>
                    
                </table>
            </div>
        </div> 
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import BillComponent from "@/components/BillComponent.vue" 

export default {
    components: {PageTitleComponent, BillComponent},
    data(){
        return {
            demoData: {
                name: "JSS FRESHERS",
                payments: [
                    {name: "School Fees", amount: "10000"},
                    {name: "Electricity Bill", amount: "2500"},
                    {name: "WAEC fee", amount: "3200"}
                ]
            },
            newBill: {
                name: "",
                payments: []
            },
        }
    },
    mounted(){
        this.$store.commit('deactivateLoadingState')
    },
    methods: {
        adder(){
            let refName = prompt("Name of Payment")
            let refAmount = prompt("Amount")

            if(refName && refAmount){
                this.newBill.payments.push({name: refName, amount: refAmount})
            } else {
                alert("An error occurred. Cross check inputted data")
            }
        }
    }
}
</script>