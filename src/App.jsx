import { useState, useRef, useEffect } from 'react';
import { createMsg, onMsgsUpdated, getOrCreateRoom } from './firebase/api';
import { Msg } from './styles';

function App() {
  const [msgs, setMsgs] = useState([]);
  const [roomCode, setRoomCode] = useState();
  const [userId, setUserId] = useState();
  const msgRef = useRef();

  useEffect(() => {
    if (roomCode) {
      onMsgsUpdated(roomCode, (data) => {
        console.log(data)
        setMsgs(data)
      });
    }
  }, [roomCode]);

  const sendRoomCode = () => {
    getOrCreateRoom(roomCode);
  }

  const sendMessage = async () => {
    const msg = msgRef.current.value;
    await createMsg(roomCode, userId, msg);
    msgRef.current.value = '';
  }

  return (
    <>
      <input type="text" placeholder='UserId' onChange={e => setUserId(e.target.value)} />
      <input type="text" placeholder='RoomCode' onChange={e => setRoomCode(e.target.value)} />
      <button onClick={sendRoomCode}>Create Room if not exists</button>


      {
        msgs.map(msg => <Msg key={msg.id} isOwnMsg={msg.userId === userId}>{msg.msg}</Msg>)
      }


      <input type="text" placeholder='Message Text' ref={msgRef} />
      <button onClick={sendMessage}>Send Message</button>
    </>
  )
}

export default App
