import Router from "./app/Router";
import Login from "./pages/Login";
import { useUserContext } from "./providers/UserProvider";

const App = () => {
  const [user] = useUserContext();
  return (
    <div>

      {
        user != null ? <Router /> : <Login />
      }
    </div>
  );
};

export default App;