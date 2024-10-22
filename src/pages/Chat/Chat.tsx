import React, { useEffect, useState, useRef } from 'react';
import { useHref, useParams } from 'react-router-dom';
import { createMsg, getUsersByIds, onMsgsUpdated } from '../../firebase/api';
import { Msg, MsgInput, MsgRow, SendButton } from './Chat.styles';
import { useUserContext } from '../../providers/UserProvider';
import { Button, Input, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const Chat = () => {
  const { id } = useParams();
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState('');
  const [user, setUser] = useUserContext();
  const [usersInChat, setUsersInChat] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (id) {
      onMsgsUpdated(id, async (data) => {
        setMsgs(data);

        // Obtener todos los userId diferentes
        const uniqueUserIds = [...new Set(data.map(msg => msg.userId))];
        const users = await getUsersByIds(uniqueUserIds);
        const usrsInChat = {};
        users.forEach(u => usrsInChat[u.id] = u);
        setUsersInChat(usrsInChat);
      });
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const sendMessage = async () => {
    await createMsg(id, user.id, msg);
    setMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <h2>Step 3. Write a message!</h2>
      {
        usersInChat && msgs.map(msg => {
          return (
            <Msg key={msg.id} $isOwnMsg={msg.userId === user.id}>
              <div>{usersInChat[msg.userId]?.name}-{msg.msg}</div>
            </Msg>
          );
        })
      }
      <div ref={messagesEndRef} />
      <Row>
        <Col flex="auto">
          <MsgRow>
            <Col flex="auto">
              <MsgInput
                placeholder='Message Text'
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </MsgRow>
        </Col>
        <Col>
          <SendButton type="primary" onClick={sendMessage}>
            <SendOutlined />
          </SendButton>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
