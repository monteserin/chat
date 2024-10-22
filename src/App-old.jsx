import { useState, useRef, useEffect } from 'react';
import { createMsg, getAllRooms, login, getUserRoomsByUserId, createRoom, getAllUsers, getTwoHumansRoomId, onMsgsUpdated } from './firebase/api';
import { Box, Error, Msg } from './App.styles';

function App() {
  const [msgs, setMsgs] = useState([]);
  const [roomCode, setRoomCode] = useState();
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState(null);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const msgRef = useRef();
  const [allUsers, setAllUsers] = useState([]);
  const [userHasNoRoomsMsgVisible, setUserHasNoRoomsMsgVisible] = useState(null);


  useEffect(() => {
    getAll();
    getUsers();
  }, []);

  const getUsers = () => {
    getAllUsers().then(data => {
      console.log(data);
      setAllUsers(data);
    });
  }
  const getAll = () => getAllRooms().then(data => setRooms(data));
  const getUserRooms = (uid) => {
    console.log('333333333333333', uid)
    getUserRoomsByUserId(uid).then(data => {
      if (data == null) setUserHasNoRoomsMsgVisible(true);
      else setUserRooms(data);
    });
  }
  useEffect(() => {
    if (roomCode) {
      onMsgsUpdated(roomCode, (data) => {
        console.log(data)
        setMsgs(data)
      });
    }
  }, [roomCode]);

  const sendMessage = async () => {
    const msg = msgRef.current.value;
    await createMsg(roomCode, userId, msg);
    msgRef.current.value = '';
  }

  return (
    <><h1>Monteserín Chat ٩(^‿^)۶</h1>

      <h2>Step 1</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        <Box>
          <h3>Choose one room...</h3>
          {
            rooms && rooms.map(room => <div key={room.id}> <button onClick={() => setRoomCode(room.id)}>{room.id}</button></div>)
          }
        </Box>
        <Box>
          <h3>Or choose one user to talk...</h3>
          {
            allUsers.map(user => <div key={user.id}> <button onClick={() => {
              getTwoHumansRoomId(userId, user.id).then(roomId => {
                console.log('rrrrrrrrrrr', roomId);
                setRoomCode(roomId);
                getAll();
              });
            }}>{user.name}</button></div>)
          }
        </Box >
        <Box>
          <h3>... or choose your rooms</h3>
          <Error visible={userHasNoRoomsMsgVisible}>Este usuario no tiene rooms todavía</Error>

          {userHasNoRoomsMsgVisible != null && (
            <div>
              <button onClick={async () => {
                await createRoom([userId]);
                getAll();
                getUserRooms(userId)
              }}>Create new </button>
              {
                userRooms && (
                  <>
                    <h4>Choose your rooms</h4>
                    {
                      userRooms.map(room => <button key={room.id} onClick={() => setRoomCode(room.id)}>{room.id}</button>)
                    }
                  </>
                )
              }
            </div>
          )}
        </Box>
      </div >
      <p>Después de este paso, en cada uno de los 3 casos, habrás seleccionado una sala.</p>

      <h2>Step 2. Choose your room</h2>


      <p>CurrentRoom: {roomCode ? roomCode : 'null'}</p>
      <h2>Step 3. Write a message!</h2>
      {
        msgs.map(msg => <Msg key={msg.id} isOwnMsg={msg.userId === userId}>{msg.msg}</Msg>)
      }


      <input type="text" placeholder='Message Text' ref={msgRef} />
      <button onClick={sendMessage}>Send Message</button>
    </>
  )
}

export default App
