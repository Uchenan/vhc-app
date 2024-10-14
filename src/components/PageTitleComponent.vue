<template>
     <div class="flex flex-col mb-3 bg-white  tweak shadow-xl">
        <div class="flex text-2xl">
            <router-link :to="{name: backTo}" class="inline-block p-1 mr-2 focus:outline-none"><i class="mdi mdi-arrow-left-circle"></i></router-link>
            <span class="block font-thin flex items-center">{{ title }}</span>
        </div>
        <AcademicSessionIndiComponent /> 
    </div>
</template>

<script>
import AcademicSessionIndiComponent from '@/components/AcademicSessionIndiComponent.vue';

export default {
    components: {AcademicSessionIndiComponent},
    props: {
        backTo: String,
        title: String 
    }
}
</script>