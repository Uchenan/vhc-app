import store from "@/store"


// ensure that the calling function has already made the levels data available before 
// calling this function 
export default function level_decoder(val){
    let allLevels = store.getters['level/details']
    let res = allLevels.filter(x => x.code === val)
    return res[0].name
}