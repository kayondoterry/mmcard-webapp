import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function RAgentApp() {
  const [currentUser, _setCurrentUser] = useState(null);
  const [isLoadingCurrentUserComplete, setIsLoadingCurrentUserComplete] =
    useState(false);

  const setCurrentUser = (user) => {
    if (user) {
      const userString = JSON.stringify(user);
      localStorage.setItem("current-user", userString);
    } else {
      localStorage.removeItem("current-user");
    }
    _setCurrentUser(user);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    _setCurrentUser(currentUser);
    setIsLoadingCurrentUserComplete(true);
  }, []);

  return isLoadingCurrentUserComplete ? (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Outlet />
    </UserContext.Provider>
  ) : (
    null
  );
}

export default RAgentApp;
