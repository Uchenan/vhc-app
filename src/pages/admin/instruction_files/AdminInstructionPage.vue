<template>
    <div>
       <PageTitleComponent backTo="adHome" title="Create New Instruction" />
       <!-- <form @submit.prevent="handleSubmit"> -->
            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Date</span>
                <input type="text"  class="input-type-1" v-model="instruction.date" disabled />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">File Name</span>
                <input type="text" class="input-type-1" v-model="instruction.file_name" />
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Title</span>
                <input type="text"  class="input-type-1" v-model="instruction.title" />
            </label>

            <label class="my-2">
                <div class="flex items-center">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Address of Recipient</span>
                    <!-- <router-link :to="{name: 'adRecipientAddress'}" class="focus:outline-none"><i class="mdi mdi-plus bg-secondary hover:bg-secondarydark text-white font-bold px-1 ml-2 rounded-md "></i></router-link> -->
                </div>
                <textarea  class="input-type-1" v-model="instruction.address" ></textarea>
            </label>

            <label class="my-2">
                <div class="flex items-center">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Short Content</span>
                    <!-- <router-link :to="{name: 'adShortContent'}" class="focus:outline-none"><i class="mdi mdi-plus bg-secondary hover:bg-secondarydark text-white font-bold px-1 ml-2 rounded-md"></i></router-link> -->
                </div>
                <textarea  class="input-type-1" v-model="instruction.short_content"></textarea>
            </label>

            <label class="my-2">
                <span class="block font-medium text-slate-700 text-sm dark:text-white">Select Benefactories</span>
                <select class="input-type-1" v-model="changer">
                    <option v-for="(value, index) in staffs" :key="index" :value="value.account.ref_id">
                        {{ `${value.bio.surname} ${value.bio.other_names}`}}
                    </option>
                </select>
            </label>
            <label class="my-2">
                <div class="flex items-center justify-center font-medium">
                    <span>Full Name</span>
                    <button class="text-4xl mx-3 text-primary" @click="toggleName"><i :class="(toggler === 'full name')? 'mdi mdi-toggle-switch-off' : 'mdi mdi-toggle-switch'"></i></button>
                    <span>Account Name</span>
                </div>
                <table class="w-full">
                    <tr class="text-left bg-primary text-white">
                        <th class="p-1 rounded-tl-lg w-10">S/N</th>
                        <th class="p-1 mm">{{(toggler === 'full name')? 'Full Name' : 'Account Name'}}</th>
                        <th class="p-1">Amount(N)</th> 
                        <th class="p-1 rounded-tr-lg"></th>
                    </tr>
                    <tbody v-if="instruction.beneficiaries.length !== 0">
                        <tr v-for="(value, index) in instruction.beneficiaries"  :class="(index % 2 === 0)? 'bg-gray-200' : 'bg-gray-300'" 
                            :key="index">
                            <td class="p-1">{{ index + 1}}</td>
                            <td class="p-1 w-min mm">{{ (toggler === 'full name')? `${value.title} ${value.full_name}` : value.acct_name }}</td>
                            <td class="p-1"><input type="number" v-model="value.amount" :class="(index % 2 === 0)? 'w-14 bg-gray-200 focus:outline-none border-none font-bold' : 'w-14 bg-gray-300 focus:outline-none border-none font-bold'" /></td>
                            <!-- <td class="p-1"><button type="button" class="text-2xl text-danger" @click="removeBeneficiary(index)"><i class="mdi mdi-delete-circle-outline"></i></button></td> -->
                            <td class="p-1 text-2xl text-danger pr-2" @click="removeBeneficiary(index)">X</td>
                        </tr>
                        <tr class="text-left bg-primary text-white"> 
                            <td class="p-1 rounded-bl-lg text-right" colspan="2">Total</td>
                            <td class="p-1 rounded-br-lg font-bold" colspan="2">{{ instruction.total_amount }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="p-1 text-center text-sm bg-gray-300 rounded-bl-lg rounded-br-lg" colspan="4">--- No Beneficiary Added ---</td>
                        </tr>
                    </tbody>
                </table>
            </label>

            <br /><br />
            <div>
                <button class="form-btn-1 w-full" @click="handleSubmit">Generate Instruction</button> 
            </div>
        <!-- </form> -->

        <br />
         <!-- MANUALLY ADD A BENEFICIARY -->
        <!-- Bank information form -->
        <button class="bg-secondary my-1 py-1 px-3 focus:cursor-pointer rounded-md focus:outline-none" v-show="!manuallyAdd" @click="manuallyAdd = true"><i class="mdi mdi-plus"></i>Manually Add Benefactory</button>
        <form @submit.prevent="manualAddBeneficiary">
            <div class="bg-gray-200 p-2 my-2" v-show="manuallyAdd">
                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Beneficiary's Name</span>
                    <input type="text" class="input-type-1" v-model="manualBeneficiary.full_name" required   />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Name</span>
                    <input type="text" class="input-type-1" v-model="manualBeneficiary.acct_name" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Account Number</span>
                    <input type="text"  class="input-type-1" v-model="manualBeneficiary.acct_no" required />
                </label>

                <label class="my-2">
                    <span class="block font-medium text-slate-700 text-sm dark:text-white">Bank Name</span>
                    <input type="text"  class="input-type-1"  v-model="manualBeneficiary.bank_name" required />
                </label>

                <button class="form-btn-1 w-2/5 mx-1 my-0 bg-danger" @click="manuallyAdd = false"><i class="mdi mdi-close"></i> Close </button>
                <input type="submit" class="form-btn-1 w-2/5 mx-1 my-0" value="Add Beneficiary" />
            </div>
        </form>
            

            

        <br /><br />
        <span class="block text-xl font-thin">Useful Actions </span>
        <ul class="ml-1 p-2 border-l-2 ">
            <li><button>View Generated Instructions </button></li>
            <li><button>View Log </button></li>
        </ul>
        <br /><br />

    </div>        
    
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { getAllStaffs } from "@/services/staff.service"

export default {
    components: {PageTitleComponent},
    data() {
        return {
            manuallyAdd: false,
            instruction: {
                date: "",
                file_name: "",
                title: "", 
                address: "", 
                short_content: "", 
                beneficiaries: [], 
                total_amount: 0,
                test: ""
            },
            manualBeneficiary: {
                title: "",
                full_name: "",
                acct_name: "",
                acct_no: "", 
                bank_name: "",
                amount: ""
            }, 
            staffs: [],
            changer: "",
            AllBeneficiaries: [],
            toggler: "full name"
        }
    },
    watch: {
        changer(val) {
            let res = {}
            this.staffs.forEach(x => {
                if(x.account.ref_id === val){
                    if(x.bank.acct_name === "" || x.bank.bank_name === "" || x.bank.acct_no === ""){
                        alert("The Selected Staff bank detail is incomplete!")
                    } else {
                        res = {
                            ...x.bank, 
                            full_name: `${x.bio.surname} ${x.bio.other_names}`,
                            title: x.bio.title,
                            amount: ""
                        }
                        
                        this.instruction.beneficiaries.push(res)
                    }
                }
            })
        },
        "instruction.beneficiaries": {
            deep: true,
            handler: function(val){
                let result = 0
                this.instruction.beneficiaries.forEach(x => {
                    result += x.amount
                })
                this.instruction.total_amount = result 
            },
        },
        "instruction": {
            deep: true,
            handler: function(){
                this.$store.commit('setInstruction', this.instruction)
            }
        }
        
        
    },
    mounted(){
        // this.instruction = this.$store.state.instruction
        getAllStaffs().then(doc => {
            if(doc === "nil"){
                setTimeout(() => {
                    alert("Weak Network Connection")
                    this.$router.push({name: 'adHome'})
                }, 3000)
            } else {
                this.staffs = doc
                this.$store.commit('deactivateLoadingState')   
            }
        })
        // Setting the date automatically. This value can not be changed in the form 
        let d = new Date()
        this.instruction.date = d.toLocaleDateString()

    }, 
    methods: {
        handleSubmit() {
            let userResponse = confirm("Do you want to generate the instruction now?")
            
            if(userResponse === true){
                let stringRes = Object.assign({}, this.instruction)
                this.$store.commit('setInstruction', stringRes)
                this.$router.push({name: 'adGenerate'})
            } else {
                return 
            }
        },
        generateFilename() {
            return "Jan 6th Transfer Instruction"
        },
        removeBeneficiary(val){
            this.instruction.beneficiaries.splice(val, 1)
        },
        manualAddBeneficiary(){
            let manualData = Object.assign({}, this.manualBeneficiary)
            this.instruction.beneficiaries.push(manualData)
            this.clearManualBeneficiary()
            this.manuallyAdd = false 
        },
        clearManualBeneficiary(){
            this.manualBeneficiary.title = ""
            this.manualBeneficiary.full_name = ""
            this.manualBeneficiary.acct_name = ""
            this.manualBeneficiary.acct_no = ""
            this.manualBeneficiary.bank_name = ""
            this.manualBeneficiary.amount = ""
        },
        toggleName(){
            this.toggler = (this.toggler === "full name")? "account name" : "full name"
        }

    }
}
</script>

<style scoped>
.mm {
    width: 400px; 
}
</style>