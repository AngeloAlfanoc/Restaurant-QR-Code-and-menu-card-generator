import { Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import ListedConsumers from "../../components/listedConsumers";
import { UserInfoContext } from "../../contexts/userContext";
import ClientStatus from "../../components/clientStatus";
import { db } from "../../services/firebase";

export default function CheckIns() {
  const { userInfo } = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
  const [verifiedUser, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      setVerified(userInfo.verified);
      db.collection("checkins")
        .where("owner", "==", userInfo.id)
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
          setPublicInfo(tempLoad[0]);
          setLoading(false);
        });
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {verifiedUser ? (
        <>
          <ClientStatus
            id={userInfo.id}
            plan={userInfo.plan}
            company={userInfo.company}
          />
          <Typography className="my-3" variant="h5">
            Check-ins
          </Typography>
          {publicInfo && (
            <ListedConsumers tools={true} docid={publicInfo.docid} range={25} />
          )}
        </>
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
