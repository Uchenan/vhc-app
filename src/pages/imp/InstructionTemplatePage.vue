<template>
    <div>
        <div class="content" ref="pdfer">
            <br /><br /><br />
            <br /><br /><br />
            <br /><br /><br />
            <br />
            
            <!-- DAT OF INSTRUCTION -->
            <span class="flex justify-end font-bold mr-4">{{ dateParser(instruction.date) }}</span>
            
            <br />
            
            <!-- ADDRESS OF INSTRUCTION -->
            <div class="w-2/5">
                <p v-for="x in address" :key="x">
                    {{ x }}
                </p>
            </div>
            
            <!-- SALUTATION TO THE BRANCH MANAGER -->
            <div>Dear Sir, </div>
            <br />

            <!-- TITLE OF INSTRUCTION -->
            <div class="font-bold text-center uppercase mt-4"> {{ instruction.title }} </div> 

            <!-- SHORT CONTENT OF INSTRUCTION -->
            <div class="text-justify">
                {{ instruction.short_content }}
            </div>

            <br /> 

            <!-- TABLE OF INSTRUCTION  -->
            <div>
                <table class="w-full">
                    <thead class="text-left bg-instruction text-white">
                        <th class="p-2">S/N</th>    
                        <th class="p-2">ACCOUNT NAME</th>    
                        <th class="p-2">ACCOUNT NO.</th>    
                        <th class="p-2">BANK NAME</th>    
                        <th class="p-2">AMOUNT</th>        
                    </thead>    
                    <tbody>
                        <tr v-for="(value, index) in instruction.beneficiaries" :key="index" :class="(index % 2 === 0)? 'bg-gray-200' : 'bg-gray-300'">
                            <td class="px-2 py-1" cellspacing="10">{{ index + 1}} </td>
                            <td class="px-2 py-1">{{ value.acct_name }}</td>
                            <td class="px-2 py-1">{{ value.acct_no }}</td>
                            <td class="px-2 py-1">{{ value.bank_name }}</td>
                            <td class="px-2 py-1">{{ value.amount }}</td>
                        </tr>
                        <tr class="bg-white font-bold">
                            <td class="px-2 py-1 text-right" colspan="4">TOTAL</td>
                            <td class="px-2 py-1">{{ instruction.total_amount}}</td>
                        </tr>
                    </tbody>
                </table> 
            </div>

            <br /> 
            
            <p>Thank you for your prompt attention.</p>
            
            <br />

            <p>Yours faithfully </p>
            <br />
            <img :src="sign" alt="sign" class="spp" />
            <!-- ../../assets/imgs/Capture.PNG -->
        </div>
        <button @click="test" style="font-size: 50px">Download </button>
    </div>
</template>


<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { createLog, logBodyForm } from "@/services/log.service"
import signature from "@/assets/imgs/Capture.png"

export default {
    data(){
        return {
            sign: signature,
            instruction: {
                date: "",
                file_name: "",
                title: "", 
                address: "", 
                short_content: "", 
                beneficiaries: [], 
                total_amount: 0,
                test: ""
            }
        }
    },
    computed: {
        address() {
            return this.textParser(this.instruction.address)
        }
    },
    mounted(){
        this.instruction = this.$store.state.instruction
        this.$store.commit('deactivateLoadingState')
        setTimeout(() => {
            this.$store.commit('activateLoadingState')
            this.test()
            this.$router.push({name: 'adInstruction'})
        }, 2000);
    },
    beforeUnmount(){
        this.$store.commit('unsetInstruction')
    },
    methods: {
        test(){
            alert("Generating PDF instruction: \n" + this.instruction.file_name)
            const doc = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
            })

            html2canvas(this.$refs.pdfer, {
                width: 780,
                height: 1100,
                quality: 4,
                scale: 1
            }).then(canva => {
                const img = canva.toDataURL("image/png")

                // SAVING THE PDF COPY OF THE GENERATED TRANSFER INSTRUCTION
                doc.addImage(img, "PNG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight())
                doc.save(`${this.instruction.file_name}.pdf`)


                // crafting log message
                let initiator = `${this.$store.state.user.user.bio.title} ${this.$store.state.user.user.bio.surname} ${this.$store.state.user.user.bio.other_names}`
                let message = `${initiator} generated a transfer instruction whose total amount is ${this.instruction.total_amount}`
                

                // stores a log body message in the database 
                createLog(logBodyForm(message))

            })
        },
        textParser(val){
            let res = val.split("\n")
            return res
        },
        dateParser(val){
            let Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            let d = new Date(val)
            
            d = `${days[d.getDay()]} ${d.getDate()} ${Months[d.getMonth()]}, ${d.getFullYear()}`
            return d
        }
    }    
}
</script>



<style scoped>
.content {
    background: url("../../assets/imgs/bg-template.jpg");
    width: 210mm; /*210mm; */
    height: 297mm;  /*297mm; */
    font-size: 14px; 
    background-size:contain;
    padding: 20px; 
}
.spp {
    width: 130px; 
}
</style>