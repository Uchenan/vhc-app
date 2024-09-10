import db from "./init"
import { generateId } from "./utility.service"
import { collection, getDocs } from "firebase/firestore"

let col = collection(db, "student")

// This is a function that returns all the students stored in the database 
export async function getAllStudents() {
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

// This is a function that returns the information of a student whose ref id has been provided 
export async function getSpecificStudent(refid) {
    try {
        const querySnap = await getDoc(doc(col, refid))
        const result = (querySnap.exists())? querySnap.data() : "nil"
        return result
    } catch(error) {
        return "nil"
    }
}

// This is a function that updates a student's record 
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


//This is a function that creates a new student
export async function createStaff(data) {
    try{
        // const compatibleCrypto = getCrypto()

        await generateId(data.bio.gender, "student").then(val => {
            
            data.account.ref_id = val
            
            // data.account.password = compatibleCrypto.hashSync(data.account.password, 10)
            
            setDoc(doc(col, val), data).then(() => {
                alert("Account Created Successfully!!")
            }, () => {
                alert("An internal error occurred - Student Creation Failed")
                return "nil"
            })
        })

    } catch(error) {
        alert("An internal error occurred - 109 " + error)
        return "nil"
    }
}

// This is a function that deletes a student from the database 
export async function removeStudent(refid) {
    try {
        await deleteDoc(doc(col, refid)).catch(err => {
            alert("An error - " + err)
        })
    } catch(error) {
        alert("An error occurred" + error)
        return "nil"
    }
}

// This is a function that authenticates a student and logs them in 
export async function authenticateStudent(refid, password){
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