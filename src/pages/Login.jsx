import { useState } from 'react';
import { login } from '../firebase/api';
import { useUserContext } from '../providers/UserProvider';
import { Button, Input } from 'antd';
const Login = () => {
  const [user, setUser] = useUserContext();
  const [userName, setUserName] = useState();
  return (
    <div>
      <h2>Step 1. Log In</h2>
      <Input placeholder='UserId' onChange={e => setUserName(e.target.value)} />
      <Button type="primary" onClick={async () => {
        const userId = await login(userName);
        setUser({ userName, id: userId });
      }}>Log in</Button>

      {
        user != null && <p>Logged UserId: {user.id}</p>
      }
    </div>
  );
};

export default Login;