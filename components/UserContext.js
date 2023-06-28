import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (userType === "GAMER" || userType === "NO GAMER") {
      window.sessionStorage.setItem("tipoUsuario", userType);
    }
  }, [userType]);

  useEffect(() => {
    if (window.sessionStorage.getItem("tipoUsuario")) {
      setUserType(window.sessionStorage.getItem("tipoUsuario"));
    }
  });


  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}
