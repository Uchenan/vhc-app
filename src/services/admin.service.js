import db from "./init"
import { generateId } from "./utility.service"
import { collection, getDocs, getDoc, doc,updateDoc, setDoc, deleteDoc } from "firebase/firestore"

let col = collection(db, "admin")

// This is a function that returns all the admins stored in the database 
export async function getAllAdmins() {
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

// This is a function that returns the information of an Admin whose ref id has been provided 
export async function getSpecificAdmin(refid) {
    try {
        const querySnap = await getDoc(doc(col, refid))
        const result = (querySnap.exists())? querySnap.data() : "nil"
        return result
    } catch(error) {
        return "nil"
    }
}


// This is a function that updates an admin's record 
export async function updateAdmin(refid, data) {
    try {
        await updateDoc(doc(col, refid), data).then(() => {
            return "success"
        }, () => {
            return "nil"
        })
    } catch(error) {        
        return "nil"
    }
}


//This is a function that creates a new admin
export async function createAdmin(data) {
    try{
        await generateId(data.bio.gender, "admin").then(val => {
            data.account.ref_id = val 
            setDoc(doc(col, val), data).then(() => {
                alert("Account Created Successfully!!")
            }, () => {
                alert("An internal error occurred - 101")
                return "nil"
            })
        })

    } catch(error) {
        alert("An internal error occurred - 102")
        return "nil"
    }
}

// This is a function that deletes an admin from the database 
export async function removeAdmin(refid) {
    try {
        await deleteDoc(doc(col, refid)).catch(err => {
            alert("An error - " + err)
        })
    } catch(error) {
        alert("An error occurred" + error)
        return "nil"
    }
}


// This is a function that authenticates an admin and logs them in 
export async function authenticateStaff(refid, password){
    try {
        const querySnap = await getDoc(doc(col, refid))
        if(querySnap.exists()) {
            if(querySnap.data().account.password === password){
                alert("Login Successful")
            } else {
                alert("Not logged in")
            }
        }
    } catch(error) {
        return "nil"
    }
}