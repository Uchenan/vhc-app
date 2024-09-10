import db from "./init"
import { collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"

let col = collection(db, "class")

// This is a function that returns all the classes stored in the database 
export async function getAllClasses() {
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


// This is a function that returns the settings of a class whose code has been provided 
export async function getSpecificClass(code) {
    try {
        const querySnap = await getDoc(doc(col, code))
        const result = (querySnap.exists())? querySnap.data() : "nil"
        return result
    } catch(error) {
        return "nil"
    }
}

// This is a function that updates a class's record 
export async function updateClass(code, data) {
    try {
        await updateDoc(doc(col, code), data).then(() => {
            return "success"
        }, () => {
            return "nil"
        })
    } catch(error) {        
        return "nil"
    }
}


//This is a function that creates a new class
export async function createClass(data) {
    try{
        const querySnap = await getDoc(doc(col, data.code))
        if(querySnap.exists()){
            alert("Class Code Already exist in the database. Class is not created!")
            return "nil"
        } else {
            setDoc(doc(col, data.code), data).then(() => {
                alert(`Class: ${data.name} created successfully`)
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



// This is a function that deletes a class from the database 
export async function removeClass(code) {
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

