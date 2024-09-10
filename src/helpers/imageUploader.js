import axios from "axios"
import store from "../store"


export async function imageStaffUploader(ref_id, value){
    let result = null 
    await axios.post(`${import.meta.env.VITE_URI}/image/staff/${ref_id}`, {file: value}).then(res => {
        if(res.data.name === "Error"){
            result = null 
        } else {
            result = res.data
        }
    }).catch(() => {
        result = null 
    })

    return result 

}


export async function imageStudentUploader(ref_id, value){
    let result = null 
    await axios.post(`${import.meta.env.VITE_URI}/image/student/${ref_id}`, {file: value}).then(res => {
        console.log(res.data)
        if(res.data.name === "Error"){
            result = null 
        }else if(res.data.code == "ENOTFOUND" ){
            result = null 
        } else {
            console.log("Picture changed successfully")
            result = res.data
        }
    }).catch(err => {
        console.log(err)
    })

    return result 

}