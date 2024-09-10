<template>
    <div class="mx-2 lg:w-3/5 lg:mx-auto text-sm">
        <div class="my-3 flex justify-center">
            <img class="h-30 w-40 mb-3.5" src="/school_img.png" alt="Vicegerents Logo">
        </div>
        
        <!-- <transition mode="out-in">
            <router-view></router-view>
        </transition>  -->

        <router-view v-slot="{ Component }">
        <transition name="fade"  mode="out-in">
            <component :is="Component" />
        </transition>
        </router-view>

        
    </div>
</template>

<script>
export default {
// .fade-enter-active, .fade-leave-active {
//     transition: 1s;
// }
// .fade-enter {
//     transform: translate(-100%, 0)
// }
// .fade-leave-to {
//     transform: translate(100%, 0)
// }




// .fade-enter-active, .fade-leave-active {
//     transition: 1s ease;
// }
// .fade-leave-to {
//     transform: translate(-100%, 0)
// }
// .fade-enter-from {
//     transform: translate(100%, 0)
// }
// .fade-enter-to {
//     transform: translate(100%, 0)

// }
// .fade-leave-from {
//     transform: translate(-100%, 0)
// }



}
</script>

<style scoped>


</style>