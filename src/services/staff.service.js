import db from "./init"
import { generateId } from "./utility.service"
import { collection, getDocs, getDoc, doc,updateDoc, setDoc, deleteDoc } from "firebase/firestore"
// import { hashSync, compareSync } from "bcryptjs"
// import crypto from "bcryptjs"

let col = collection(db, "staff")

// to soften the pressure of crypto 
// function getCrypto(){
//     try {
//         return window.crypto;
//     } catch {
//         return crypto;
//     }
// }

// This is a function that returns all the staffs stored in the database 
export async function getAllStaffs() {
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

// This is a function that returns the information of a staff whose ref id has been provided 
export async function getSpecificStaff(refid) {
    try {
        const querySnap = await getDoc(doc(col, refid))
        const result = (querySnap.exists())? querySnap.data() : "nil"
        return result
    } catch(error) {
        return "nil"
    }
}


// This is a function that updates a staff's record 
export async function updateStaff(refid, data) {
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


//This is a function that creates a new staff
// when admin_rights is set to "yes", the staff created will have admin rights 
//  else the staff will only work as a staff with limited permissions 
export async function createStaff(data) {
    try{
        // const compatibleCrypto = getCrypto()

        await generateId(data.bio.gender, "staff").then(val => {
            
            data.account.ref_id = val
            
            // data.account.password = compatibleCrypto.hashSync(data.account.password, 10)
            
            setDoc(doc(col, val), data).then(() => {
                alert("Account Created Successfully!!")
            }, () => {
                alert("An internal error occurred - 101 (without rights)")
                return "nil"
            })
        })

    } catch(error) {
        alert("An internal error occurred - 102 " + error)
        return "nil"
    }
}


// This is a function that deletes a staff from the database 
export async function removeStaff(refid) {
    try {
        await deleteDoc(doc(col, refid)).catch(err => {
            alert("An error - " + err)
        })
    } catch(error) {
        alert("An error occurred" + error)
        return "nil"
    }
}


// This is a function that authenticates a staff and logs them in 
export async function authenticateStaff(refid, password){
    // let compatibleCrypto = getCrypto()
    try {
        const querySnap = await getDoc(doc(col, refid))
        if(querySnap.exists()) {
            // if(compatibleCrypto.compareSync(password, querySnap.data().account.password)){ //querySnap.data().account.password === password
            //     return querySnap.data()
            // } else {
            //     return "nil"
            // }
            if(password === querySnap.data().account.password){
                return querySnap.data()
            } else {
                return "nil"
            }
        } else {
            return "nil"
        }
    } catch(error) {
        alert("Weak Internet Connection!!!")
        return "nil"
    }
}