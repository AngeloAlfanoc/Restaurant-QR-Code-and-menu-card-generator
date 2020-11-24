import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { UserContext } from "../userContext";

interface CheckinDataObject {
  createdAt: number;
  editedAt: number | null;
  id: string;
  owner: string;
  published: boolean;
}
type CheckinProverProps = { children: React.ReactNode };

export const CheckinContext = createContext<CheckinDataObject | undefined>(
  undefined
);

function CheckinsProvider({ children }: CheckinProverProps) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
            setError(
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
      {children}
    </CheckinContext.Provider>
  );
}

export default CheckinsProvider;
