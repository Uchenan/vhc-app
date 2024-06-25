import db from "./init"
import { collection, getDocs, addDoc } from "firebase/firestore"


let col = collection(db, "log")


// This is a function that reads all the stored logs in the database
export async function getAllLogs(num = "all"){
    try {
        const querySnap = await getDocs(col)
        if(querySnap.metadata.fromCache){
            return "nil"
        } else {
            const result = querySnap.docs.map(doc => doc.data())
            
            // sorting out the resultant log array that will be sent
            if(result.length > 0){
                let sortedResult = result.sort((x, y) => {
                    // alert(`${Date.parse(x.real_date)} \n ${Date.parse(y.real_date)}`)
                    if(Date.parse(x.real_date) < Date.parse(y.real_date)){
                        return 1
                    } else if(Date.parse(x.real_date) > Date.parse(y.real_date)) {
                        return -1
                    } else {
                        return 0
                    }
                })
                  
                // determining whether to return all logs or some of them 
                if(num === "all"){
                    return sortedResult
                } else {
                    return sortedResult.slice(0, num)

                }
            } else {
                return result
            }
        }      
    } catch(error){
        return "nil"
    }
}


// This is a function that creates a new log
export async function createLog(data){
    try{
        await addDoc(col, data).then(() => {
            alert("Logged Successfully")
        }, () => {
            alert("An internal error occurred HH")
            return "nil"
        })
    } catch(error){
        alert("An internal error occurred - HHHH" + error)
        return "nil"
    }
}


// This is a function that will format and generate the log body that will be sent to the database
export function logBodyForm(sms){
    let d = new Date()
    let date = new Date()

    d = d.toString()
    date = `${date.toDateString()}  (${date.toLocaleTimeString()})`

    let message = {
        message: sms,
        timestamp: date,
        real_date: d
    }
    return message
}