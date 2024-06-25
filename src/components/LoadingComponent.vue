<template>
    <div class="loading_comp">
        <div class="loading_comp_in ">
            <i class="mdi mdi-loading iconic"></i>
        </div>
    </div> 
</template>

<style scoped>
.loading_comp {
    width: 100%;
    height: 100%; 
    z-index: 40; 
    position: fixed;
    background-color: rgba(0,0,0,0.5); 
    top: 0; 
    left: 0; 
    right: 0; 
    display: flex;
    justify-content: center;
    align-items: center; 
}

.loading_comp_in {
    font-size: 2rem; 
    background-color: white; 
    padding: 4px 10px; 
    border-radius: 6px; 
    box-shadow: 0px 0px 15px rgba(0,0,0,0.5); 
}

.iconic {
    display: block; 
    animation-name: spin; 
    animation-duration: 800ms; 
    animation-iteration-count: infinite; 
    animation-timing-function: linear;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
        color: #141631;
    }
    20% {
        color: #3D4293
    }
    40% {
        color: #7D81B7
    }
    60% {
        color: #C5DE83;
    }
    80% {
        color: #A9CE45;
    }
    to {
        transform: rotate(360deg); 
        color: #384417;
    }
}
</style> 