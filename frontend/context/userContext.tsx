'use client';

import { createContext, useState, useEffect, useContext } from 'react';

interface User {
  id: any;
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Access the cookie from the client-side using document.cookie
        const userCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('user='))
          ?.split('=')[1]
          ?.replace("%22&token", '"'); 

        if (userCookie) {
          try {
            const decodedUserCookie = decodeURIComponent(userCookie);
            const parsedUser = JSON.parse(decodedUserCookie);
            setUser(parsedUser);
          } catch (parseError) {
            console.error("Error parsing JSON from cookie:", parseError);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data from cookie:", error);
        setUser(null); // Set user to null in case of an error
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};