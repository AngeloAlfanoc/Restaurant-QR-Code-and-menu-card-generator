import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { UserContext } from "../userContext";
import { ICheckinDataObject } from "../../types";
import { IContextProps } from "../../types";

export const CheckinContext = createContext<ICheckinDataObject | undefined>(
  undefined
);

function CheckinsProvider({ children }: IContextProps) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [checkinData, setCheckinData] = useState();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("checkins")
      .where("owner", "==", user.id)
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
          } catch {
            throw new Error(
              "Probleem bij het ophalen van client gegevens gelieve uw systeem beheerder de contacteren."
            );
          } finally {
            setLoading(false);
          }
        }
        setCheckinData(tempLoad[0]);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [user.id]);
  return (
    <CheckinContext.Provider value={checkinData}>
      {!loading && children}
    </CheckinContext.Provider>
  );
}

export default CheckinsProvider;
