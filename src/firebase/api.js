import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, onSnapshot, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from './firebase';
const collectionName = 'msgs';


export const getMsgs = async () => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

export const createMsg = async (roomCode, userId, msg) => {
    try {
        const colRef = collection(db, 'rooms', roomCode, collectionName);
        const data = await addDoc(colRef, { userId, msg, date: Date.now() });
        return data.id;
    } catch (e) {
        console.log(e)
    }
}

const getArrayFromCollection = (collection) => {
    const msgs = collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });

    return msgs.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
    });
}


export const onMsgsUpdated = (roomId, callback) => onSnapshot(collection(db, 'rooms', roomId, 'msgs'), (docs) => {
    callback(getArrayFromCollection(docs));
});


export const getOrCreateRoom = async (roomCode) => {
    try {
        const roomCodeIfExists = await getRoomById(roomCode);
        if (!roomCodeIfExists) {
            const docRef = doc(db, 'rooms', roomCode);
            await setDoc(docRef, {});
        }
        return roomCode;

    } catch (e) {
        console.log(e)
    }
}

export const getRoomById = async (roomId) => {
    const docRef = doc(db, 'rooms', roomId);
    const result = await getDoc(docRef);
    return result.data();
}