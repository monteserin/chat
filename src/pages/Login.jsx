import { useState } from 'react';
import { login } from '../firebase/api';
import { useUserContext } from '../providers/UserProvider';
import { Button, Input } from 'antd';
const Login = () => {
  const [user, setUser] = useUserContext();
  const [mail, setMail] = useState();
  return (
    <div>
      <h2>Step 1. Log In</h2>
      <Input placeholder='mail' onChange={e => setMail(e.target.value)} />
      <Button type="primary" onClick={async () => {
        await login(mail);
        console.log(33333)
        setUser({ id: mail });
        console.log(4444)
      }}>Log in</Button>

      {
        user != null && <p>Logged UserId: {user.id}</p>
      }
    </div>
  );
};

export default Login;