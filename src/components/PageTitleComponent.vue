<template>
     <div class="flex mb-3 text-2xl items-center bg-white tweak shadow-xl p-2">
        <router-link :to="{name: backTo}" class="inline-block p-1 mr-2 focus:outline-none"><i class="mdi mdi-arrow-left-circle"></i></router-link>
        <span class="block font-thin flex items-center">{{ title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        backTo: String,
        title: String 
    }
}
</script>