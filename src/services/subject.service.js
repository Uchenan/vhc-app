import db from "./init"
import { collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"

let col = collection(db, "subject")

// This is a function that returns all the subjects stored in the database 
export async function getAllSubjects() {
    try {
        const querySnap = await getDocs(col)
        if(querySnap.metadata.fromCache){
            return "nil"
        } else {
            const result = querySnap.docs.map(doc => doc.data())
            return result
        }      
    } catch(error){
        return "nil"
    }
}


// This is a function that returns the information of a subject whose code has been provided 
export async function getSpecificSubject(code) {
    try {
        const querySnap = await getDoc(doc(col, code))
        const result = (querySnap.exists())? querySnap.data() : "nil"
        return result
    } catch(error) {
        return "nil"
    }
}

// // This is a function that updates a subject's record 
// export async function updateSubject(refid, data) {
//     try {
//         await updateDoc(doc(col, refid), data).then(() => {
//             return "success"
//         }, () => {
//             return "nil"
//         })
//     } catch(error) {        
//         return "nil"
//     }
// }


//This is a function that creates a new subject
export async function createSubject(data) {
    try{
        const querySnap = await getDoc(doc(col, data.code))
        if(querySnap.exists()){
            alert("Subject Code Already exist in the database. Subject is not created!")
            return "nil"
        } else {
            setDoc(doc(col, data.code), data).then(() => {
                alert(`Subject: ${data.name} created successfully`)
            }, () => {
                alert("An internal error occurred")
                return "nil"
            })
        }
    } catch(error) {
        alert("An internal error occurred - 102 " + error)
        return "nil"
    }
}



// This is a function that deletes a subject from the database 
export async function removeSubject(code) {
    try {
        await deleteDoc(doc(col, code)).then(() => {
            alert("Deleted Successfully")
        }).catch(err => {
            alert("An error - " + err)
        })
    } catch(error) {
        alert("An error occurred" + error)
        return "nil"
    }
}

