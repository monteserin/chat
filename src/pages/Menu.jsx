import { Link, useNavigate } from "react-router-dom";
import { getTwoHumansRoomId } from '../firebase/api';
import { useUserContext } from "../providers/UserProvider";

const Menu = () => {
  const [user] = useUserContext();
  const navigation = useNavigate();

  const handleChatWithAdmin = () => {
    const adminId = '5WUVaKCk68gOwQR3BbNe' // juan con j minúscula
    console.log('Chat with admin')
    getTwoHumansRoomId(user.id, adminId).then(roomId => {
      console.log('111111111111-', roomId)
      navigation('/room/' + roomId);
    });
  }
  return (
    <div>
      <ul>

        <li>
          <Link to="/choose-room">Choose one room of all avaiable rooms</Link>
        </li>
        <li>
          <Link to="/choose-room">Choose one room</Link>
        </li>
        <li>
          <Link to="/choose-one-of-my-rooms">Choose one room of my rooms</Link>
        </li>
        <li>
          <button onClick={handleChatWithAdmin}>Chat with admin</button>
        </li>
        <li>
          <Link to="/choose-user-to-chat">Chat with one user</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;