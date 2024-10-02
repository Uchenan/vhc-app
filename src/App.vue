<template>
    <div class="text-gray-700 tweaker">
        <div class="absolute z-40">
            <ModalComponent />
        </div>
        <LoadingComponent v-if="loadingState" /> 
        <div class="router text-xs">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue"
import { container } from "jenesius-vue-modal"

export default {
    components: {
        LoadingComponent, ModalComponent: container
    }, 
    computed: {
        loadingState(){
            return this.$store.state.loadingState
        }
    },
}
</script>

<style>
.modal {
    z-index: 100;  
}
.router {
    z-index: -1; 
}
.tweak {
    position: sticky; 
    top: 0; 
}
.table-tweak {
    white-space:normal;
}
.modal-container {
    background-color: red; 
}
.tweaker {
    background-color: white; 
    position: absolute;
    top: 0;
    bottom: 0 !important;
    left: 0;
    right: 0; 
    overflow: auto; 
}
</style>
