<template> 
    <div>
       <PageTitleComponent backTo="adHome" title="Manage Classes" />

        <router-link class="form-btn-1 py-1 px-3" :to="{name: 'adCreateClass' }">
            <i class="mdi mdi-plus"></i> New Class
        </router-link>

        <h1 class="text-2xl font-thin mt-6 pb-1 border-b">Registered Classes</h1>
        <div class="mt-4" v-if="levels.length > 0">
            <router-link class="p-3 my-4 mx-2 rounded-xl block bg-gray-200" v-for="(value, index) in levels" 
            :key="index" :to="{name: 'adEditClass', params: {code: value.code}}">
                <i class="mdi mdi-radiobox-marked mr-2"></i>{{ value.name }}
            </router-link>
        </div> 
        <div class="mt-8 text-center" v-else>
            ----- No Registered Class yet! ----- 
        </div> 

        
        <!-- FOR STUDENTS THAT ARE NOT PLACED INTO CLASSES  -->
        <br /> 
        <div class="mt-4 border-t">
            <router-link class="p-3 my-4 mx-2 rounded-xl block bg-gray-200" 
                :to="{name: 'adClassUnclassified'}">
                <i class="mdi mdi-radiobox-marked mr-2"></i> Unclassified Students 
            </router-link>
        </div> 
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent},
    data() {
        return {
            levels: []
        }
    },
    mounted(){
        this.$store.dispatch('level/fetchLevels').then(res => {
            if(res === true){
                this.levels = this.$store.getters['level/details']
            }
        })
    }
}
</script>