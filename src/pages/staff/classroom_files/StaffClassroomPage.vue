<template>
    <div>
        <PageTitleComponent backTo="saHome" title="My Classrooms" />
        <br /> 
        
        <div v-if="level.length !== 0">
            {{ level }}
        </div>
        <div v-else>
            <div class="flex flex-col items-center mt-10">
                <div style="font-size: 70px;">
                    <i class="mdi mdi-cancel text-gray-400"></i>
                </div>
                <br /><br /> 
                <p class="block">You have not been made a class teacher of any Class</p>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitleComponent from "@/components/PageTitleComponent.vue"

export default {
    components: {PageTitleComponent}, 
    data(){
        return {
            level: []
        }
    },
    created(){
        this.$store.dispatch('level/fetchLevels')
    },
    mounted(){

        this.$store.getters['level/details'].forEach(el => {
            if(el.class_teacher === this.$store.getters['user/details'].account.ref_id){
                this.level.push(el)
            }
        })
        this.$store.commit('deactivateLoadingState')
    }
}
</script>