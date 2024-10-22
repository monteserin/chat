import { db, doc, getDoc, getDocs, collection, query, where, addDoc, onSnapshot, documentId } from "./firebase";

const collectionName = 'msgs';

export const login = async (userName) => {
    const colRef = collection(db, 'users');
    const result = await getDocs(query(colRef, where('name', '==', userName)));
    if (result.size === 0) {
        alert('User not found, creating new user');
        const data = await addDoc(colRef, { name: userName });
        return data.id;
    }

    const arr = getArrayFromCollection(result);
    return arr[0].id;
}

export const getAllRooms = async () => {
    const colRef = collection(db, 'rooms');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

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


export const getAllUsers = async () => {
    const colRef = collection(db, 'users');
    const r = await getDocs(query(colRef));
    const r2 = getArrayFromCollection(r);
    return r2;
}

export const getUsersByIds = async (ids) => {
    const colRef = collection(db, 'users');
    const result = await getDocs(query(colRef, where(documentId(), 'in', ids)));
    return getArrayFromCollection(result);
}

export const getUserRoomsByUserId = async (userId) => {
    try {
        const roomsRef = collection(db, 'rooms');
        const result = await getDocs(query(roomsRef, where('members', 'array-contains', userId)));
        if (result.empty) {
            return null;
        } else {
            const r = getArrayFromCollection(result);
            return r;
        }
    } catch (error) {
        console.error('userId: ', userId, error);
        return false;
    }
}

export const createRoom = async (roomMembersIds) => {
    try {
        const roomsRef = collection(db, 'rooms');
        await addDoc(roomsRef, { members: roomMembersIds });
    } catch (error) {
        console.error('Error al crear la room:', error);
        return false;
    }
}

export const getRoomById = async (roomId) => {
    const docRef = doc(db, 'rooms', roomId);
    const result = await getDoc(docRef);
    return result.data();
}

export const getTwoHumansRoomId = async (userId1, userId2) => {
    const roomsRef = collection(db, 'rooms');
    const result = await getDocs(query(roomsRef, where('members', 'array-contains', userId1)));
    const r = getArrayFromCollection(result);
    const room = r.find(room => room.members.includes(userId2));
    if (!room) {
        const data = await addDoc(roomsRef, { members: [userId1, userId2] });
        return data.id;
    }
    return room.id;
}