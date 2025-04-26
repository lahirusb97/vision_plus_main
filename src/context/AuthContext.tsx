import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { removeCookie } from "typescript-cookie";

// Define the LoginResponse type
type LoginResponse = {
  message: string;
  token: string;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
};

// Define the AuthContextType interface
interface AuthContextType {
  user: LoginResponse | null;
  token: string | null;
  setUser: Dispatch<SetStateAction<LoginResponse | null>>;
  setUserToken: Dispatch<SetStateAction<string | null>>;
  clearToken: () => void;
}

// Define props for AuthContext
type AuthContextProps = {
  children: ReactNode;
};

// Create the AuthContext with default values
const StateContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setUserToken: () => {},
  clearToken: () => {},
});

// AuthContext provider component
export const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("vision_plus_token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("vision_plus_token", token);
    } else {
      localStorage.removeItem("vision_plus_token");
    }
  }, [token]);

  const setUserToken: Dispatch<SetStateAction<string | null>> = (newToken) => {
    setToken(newToken);
    if (token) {
      localStorage.setItem("vision_plus_token", token);
    }
  };
  const clearToken = () => {
    removeCookie("vision_plus_token");
    setToken(null);
  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setUserToken,
        clearToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(StateContext);
