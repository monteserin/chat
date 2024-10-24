import { db, doc, getDoc, getDocs, collection, query, where, addDoc, onSnapshot, documentId, setDoc } from "./firebase";

const collectionName = 'msgs';

export const login = async (mail) => {
    const colRef = collection(db, 'users');
    console.log(11111)
    const result = await getDocs(query(colRef, where(documentId(), '==', mail)));
    console.log(222222222)
    if (result.size === 0) {
        alert('User not found, creating new user');
        console.log(5555, mail)
        await setDoc(doc(colRef, mail), {});
        return mail;
    }

    const arr = getArrayFromCollection(result);
    return arr[0].id;
}

const getIfMailIsPremiunOnPablomonteserincom = async (mail) => {
    const url = `https://pablomonteserin.com/wp-json/rcp/v1/members/${mail}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.membership_id; // Adjust based on the actual structure of the response
    } catch (error) {
        console.error('Error fetching membership data:', error);
        return null;
    }
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