import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";

type State = { user: any };

type UserProviderProps = { children: React.ReactNode };

export const UserContext = createContext<State | null>({ user: null });
export const UserInfoContext = createContext({ userInfo: null });

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      db.collection("users")
        .where("id", "==", user.uid)
        .onSnapshot((snapshot) => {
          const tempLoad = [];
          if (snapshot.size) {
            try {
              snapshot.forEach((doc) => {
                tempLoad.push({ ...doc.data(), docid: doc.id });
              });
              setUserInfo(tempLoad[0]);
            } catch {
              setError("Probleem bij het opvragen van gebruikers info");
              Error(error);
            } finally {
              setLoading(false);
            }
          }
  
          setLoading(false);
        });
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    user && fetchUserData();
    setLoading(true);

    return () => {
      unsubscribe();
    };
  }, [user, error]);

  return (
    <UserContext.Provider value={{ user }}>
      <UserInfoContext.Provider value={{ userInfo }}>
        {!loading && children}
      </UserInfoContext.Provider>
    </UserContext.Provider>
  );
};
export default UserProvider;
