import { Link } from "react-router-dom";
import RAgentAuthCheck from "../../components/RAgentAuthCheck";
import UserContext from "../../contexts/UserContext";

function RAgentHome() {
  const getFirstName = (name) => {
    return name.split(" ")[0];
  };

  const renderHello = () => {
    return (
      <UserContext.Consumer>
        {({ currentUser }) => (
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Hello, {getFirstName(currentUser.name)}
          </h1>
        )}
      </UserContext.Consumer>
    );
  };
  const renderLogoutButton = () => {
    return (
      <UserContext.Consumer>
        {({ setCurrentUser }) => (
          <button
            onClick={() => setCurrentUser(null)}
            className="bg-red-600 disabled:bg-red-400 hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600 rounded-md px-2 py-2 text-white font-bold text-lg my-4"
          >
            Log out
          </button>
        )}
      </UserContext.Consumer>
    );
  };

  return (
    <div className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14">
      {renderHello()}
      <nav className="flex flex-col items-center">
        <ul className="flex flex-col">
          <li className="text-2xl font-bold text-center text-gray-800 my-2 hover:text-blue-700">
            <Link to="/r-agent/register-student">Register Student</Link>
          </li>
          <li className="text-2xl font-bold text-center text-gray-800 my-2 hover:text-blue-700">
            <Link to=".">Change Password</Link>
          </li>
        </ul>
        {renderLogoutButton()}
      </nav>
    </div>
  );
}

const RAgentHomeWithAuth = function () {
  return (
    <RAgentAuthCheck>
      <RAgentHome />
    </RAgentAuthCheck>
  );
};

export default RAgentHomeWithAuth;
