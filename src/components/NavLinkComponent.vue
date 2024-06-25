<template>
    <router-link :to="{name: path}" class="flex flex-col w-1/5 justify-center items-center p-2 hover:cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-600 m-2 transition-all duration-5 hover:text-current">
        <div class="text-3xl p-3 rounded-lg shadow-md mb-2 border-gray-900 bg-gray-100 dark:bg-gray-700">
            <i :class="'mdi mdi-' + icon"></i>
        </div>
        <div class="text-center">{{ name }}</div>
    </router-link>
</template>

<script>
export default {
    props: {
        icon: String,
        name: String, 
        path: String
    }
}
</script>