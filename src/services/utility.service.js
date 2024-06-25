import db from "./init"
import { getDoc, doc, updateDoc, increment } from "firebase/firestore"


// This is a function that creates new teacher's id number 
// make sure you pass the gender of the user to be created as first param
// also pass in the type of user that is to be created as second param
export async function generateId(gender = "N", type = "NA") {
    let impDoc = null 
    let suffix = null

    // determining the user type of id that will be created 
    if(type === "staff"){
        impDoc = doc(db, "important", "staff")
        suffix = "SA"
    } else if(type === "student"){
        impDoc = doc(db, "important", "student")
        suffix = "ST"
    } else {
        alert("An internal error occurred")
        return
    }


    try {
        // variables for finalizing 
        let id = ""
        let finalId = ""

        // getting the recent year
        let d = new Date()
        d = d.getFullYear().toString().substring(2)
        
        // useful variables for getting count valu from the database
        const querySnap = await getDoc(impDoc)
        const figure = querySnap.data().id_no

        // switching to know the right format to use for count
        if(figure >= 0 && figure <= 9){
            id = "000" + figure 
        } else if(figure >= 10 && figure <= 99){
            id = "00" + figure 
        } else if(figure >= 100 && figure <= 999){
            id = "0" + figure 
        } else {
            id = figure 
        }

        // constructing the final id 
        finalId = d + gender + id + suffix 
        
        // incrementing the count in the database 
        updateDoc(impDoc, {
            id_no: increment(1)
        })
        
        // sending back the response to the calling function
        return finalId

    } catch(error) {
        alert("An Internal error occurred - 100 ")
    }
}