import { createContext, useContext } from "react";
import { useUserInfo } from "./authHooks";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, userLoading, userError] = useUserInfo();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const userInfo = useContext(AuthContext);
  return userInfo;
}
