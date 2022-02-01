import { Navigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import LoginForm from "./components/LoginForm/LoginForm";

function RAgentLogin() {
  return (
    // <div className="fixed h-full w-full px-4 flex justify-center overflow-y-auto">
    <div className="p-4">
      <UserContext.Consumer>
        {({ currentUser, setCurrentUser }) =>
          currentUser ? (
            <Navigate to="/r-agent" replace={true} />
          ) : (
            <LoginForm onSuccess={setCurrentUser} />
          )
        }
      </UserContext.Consumer>
    </div>
  );
}

export default RAgentLogin;
