import React, { useState, useEffect } from 'react';
import { getAllRooms, getUserRoomsByUserId, getUsersByIds } from '../../firebase/api';
import { Link } from 'react-router-dom';
import { Room } from './ChooseRoom.styles';
const ChooseRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [usersInRooms, setUsersInRooms] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => getAllRooms().then(async (data) => {
    const uniqueUserIds = [...new Set(data.flatMap(room => room.members))].filter(f => f != null);
    const users = await getUsersByIds(uniqueUserIds);
    const usrsInChat = {};
    users.forEach(u => usrsInChat[u.id] = u);
    setUsersInRooms(usrsInChat);
    console.log('444444444', usrsInChat)

    setRooms(data);
  });

  return (
    <div>
      <h3>Choose one room...</h3>
      {
        rooms && rooms.map(room => {
          return (
            <div key={room.id}>
              <Room to={`/room/${room.id}`}>
                {
                  room.members?.map((m, index) => {
                    if (m == null) return null;
                    return (
                      <div> <span key={m}>
                        {usersInRooms[m] && usersInRooms[m].name}
                        {index < room.members.length - 1 && ', '}
                      </span>
                      </div>
                    );
                  })
                }
              </Room>
            </div>
          )
        })
      }
    </div>
  );
};

export default ChooseRoom;