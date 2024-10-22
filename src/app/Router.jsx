import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from '../pages/Menu';
import Chat from '../pages/Chat/Chat';
import ChooseRoom from '../pages/ChooseRoom';
import ChooseUserToTalk from '../pages/ChooseUserToTalk';
import ChooseOneOfMyRooms from '../pages/ChooseOneOfMyRooms';
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Menu />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/choose-user-to-chat" element={<ChooseUserToTalk />} />
      <Route path="/choose-room" element={<ChooseRoom />} />
      <Route path="/choose-one-of-my-rooms" element={<ChooseOneOfMyRooms />} />
      <Route path="/room/:id" element={<Chat />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;