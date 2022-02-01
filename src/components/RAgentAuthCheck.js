import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function RAgentAuthCheck({children}) {
  return (
    <UserContext.Consumer>
      {({currentUser}) =>
        currentUser ? children : <Navigate to="/r-agent/login" replace={true} />
      }
    </UserContext.Consumer>
  );
}

export default RAgentAuthCheck;
