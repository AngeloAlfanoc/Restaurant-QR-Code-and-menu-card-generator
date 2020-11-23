import { Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import ListedConsumers from "../../components/listedConsumers";
import { UserInfoContext } from "../../contexts/usercontext";
import ClientStatus from "../../components/clientStatus";
export default function CheckIns() {
  const { userInfo } = useContext(UserInfoContext);
  const [verifiedUser, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      try {
        setVerified(userInfo.verified);
      } catch {
        throw new Error("Probleem bij het ophalen van gegevens");
      }
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {verifiedUser ? (
        <>
          <ClientStatus id={userInfo.id} plan={userInfo.plan}  company={userInfo.company} />
          <Typography className="my-3" variant="h5">
            Check-ins
          </Typography>
          <ListedConsumers />
        </>
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
