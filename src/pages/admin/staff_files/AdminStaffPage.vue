<template>
    <div>
        <PageTitleComponent backTo="adHome" title="Manage Staffs" />
        
        <router-link :to="{name: 'adCreateStaff'}" class="inline-block py-1 px-2 m-2 bg-secondary text-sm text-white rounded-md"><i class="mdi mdi-plus"></i> New Teacher</router-link>
        
        <br />
        <!-- table for displaying all staffs -->
        <!-- TABLE HEADINGS -->
        <div class="w-full lg:w-4/5">
            <div class="flex bg-primary text-white p-2 font-bold">
                <div class="w-10">S/N</div>
                <div class="flex-grow">NAME</div>
                <div class="w-12">ADMIN</div>
            </div>

             <router-link :class="(index % 2 == 0) ? 'flex font-normal items-center bg-gray-200 p-2 hover:text-current hover:bg-gray-400' : 'flex font-normal items-center bg-gray-300 p-2 hover:text-current hover:bg-gray-400'"
                v-for="(value, index) in staffs" :key="index" 
                :to="{name: 'adEditStaff', params: {staffId: value.account.ref_id}}">
                <div class="w-10">{{ index + 1 }}</div>
                <div class="flex-grow">{{ `${value.bio.surname.toUpperCase()} ${value.bio.other_names}`}}</div>
                <div class="w-10 text-lg text-danger" v-if="value.account.admin_rights === 'yes'">
                    <i class="mdi mdi-star"></i>
                </div>
                <div class="w-10 text-lg text-primary " v-else>
                    <i class="mdi mdi-minus"></i>
                </div>
            </router-link>

        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"
import { getAllStaffs } from "@/services/staff.service"


export default {
    components: {
        PageTitleComponent 
    },
    data(){
        return {
            staffs: []
        }
    },
    mounted(){
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
    }
}
</script>