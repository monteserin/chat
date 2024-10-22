import { useState, useEffect } from 'react';
import { getUserRoomsByUserId } from '../firebase/api';
import { Link } from 'react-router-dom';
import { useUserContext } from '../providers/UserProvider';
const ChooseOneOfMyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [user] = useUserContext();

  useEffect(() => {
    getUserRooms();
  }, []);

  const getUserRooms = () => {
    console.log('11111111111')
    getUserRoomsByUserId(user.id).then(data => {
      setRooms(data);
    });
  }


  return (
    <div>
      <h3>Choose one room...</h3>
      {
        rooms && rooms.map(room => (
          <div key={room.id}>
            <Link to={`/room/${room.id}`}>{room.id}</Link>
          </div>
        ))
      }
      {
        rooms == null && <div>This user has no rooms</div>
      }
    </div>
  );
};

export default ChooseOneOfMyRooms;