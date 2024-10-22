import { useState, useEffect } from 'react';
import { getAllUsers, getTwoHumansRoomId } from '../firebase/api';
import { useUserContext } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
const ChooseUserToTalk = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user] = useUserContext();
  const navigation = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    getAllUsers().then(data => {
      console.log(data);
      setAllUsers(data);
    });
  }
  return (
    <div>
      ChatWithUser

      <h3>Choose one user to talk...</h3>
      {
        allUsers.map(u => <div key={u.id}> <button onClick={() => {
          getTwoHumansRoomId(user.id, u.id).then(roomId => {
            console.log('111111111111-', roomId)
            navigation('/room/' + roomId);
          });
        }}>{u.name}-{u.id}</button></div>)
      }
    </div>
  );
};

export default ChooseUserToTalk;