import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

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
  setToken: Dispatch<SetStateAction<string | null>>;
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
  setToken: () => {},
});

// AuthContext provider component
export const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [token, _setToken] = useState<string | null>(() => {
    // Retrieve token from cookies
    return getCookie("VISION_ACCESS_TOKEN") || null;
  });

  // Enhanced setToken to handle SetStateAction
  const setToken: Dispatch<SetStateAction<string | null>> = useCallback(
    (value) => {
      const resolvedValue = typeof value === "function" ? value(token) : value;

      _setToken(resolvedValue);
      if (resolvedValue) {
        setCookie("VISION_ACCESS_TOKEN", resolvedValue, {
          secure: true, // Ensures it’s only sent over HTTPS
          sameSite: "Strict", // Prevents sending the cookie cross-origin
          expires: 7, // Token expires in 7 days
        });
      } else {
        removeCookie("VISION_ACCESS_TOKEN");
      }
    },
    [token]
  );

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(StateContext);
