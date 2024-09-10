<template>
    <div class="w-full lg:w-1/2 p-4 rounded-lg shadow-md my-4">
        <h2 class="text-lg font-medium my-2 text-secondary">{{ title || 'N/A'}}</h2>
        <div>
            <slot>N/A</slot>
        </div>
    </div>
</template>

<script> 
export default {
    props: ["title"]
}
</script>