import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import Cookies, { getCookie, removeCookie, setCookie } from "typescript-cookie";
type AuthContextType = {
  user: LoginResponse | null;
  token: string | null;
  setUser: Dispatch<SetStateAction<Record<string, any> | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
};

type AuthContextProps = {
  children: ReactNode;
};

const StateContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const AuthContext = ({ children }: AuthContextProps) => {
  const bc = new BroadcastChannel("test_channel");
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [token, _setToken] = useState<string | null>(() => {
    // Retrieve token from cookies
    return getCookie("VISION_ACCESS_TOKEN") || null;
  });

  const setToken = useCallback((token: string | null) => {
    _setToken(token);
    if (token) {
      // Set the token as an HTTP cookie
      setCookie("VISION_ACCESS_TOKEN", token, {
        secure: true, // Ensures it’s only sent over HTTPS
        sameSite: "Strict", // Prevents sending the cookie cross-origin
        expires: 7, // Optionally set expiry (7 days here)
      });
    } else {
      // Remove the token cookie
      removeCookie("VISION_ACCESS_TOKEN");
    }
  }, []);

  const handleSetUser = useCallback((userData: Record<string, any> | null) => {
    setUser(userData);
  }, []);
  useEffect(() => {
    bc.onmessage = (event) => {
      console.log("Event data:", event.data);
    };
  }, [user]);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser: handleSetUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContext = () => useContext(StateContext);
type LoginResponse = {
  message: string;
  token: string;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
};
