import "./index.scss";

import ListedCodes from "../../components/listedCodes";
import { Typography } from "@material-ui/core";

import AddDialog from "../../components/addDialog";
import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import { UserInfoContext } from "../../contexts/usercontext";
import ClientStatus from "../../components/clientStatus";
export default function MenuCards() {
  const { userInfo } = useContext(UserInfoContext);
  const [verifiedUser, setVerified] = useState<boolean>(false);
  useEffect(() => {
    try {
      userInfo && setVerified(userInfo.verified);
    } catch {
      throw new Error("Probleem bij het ophalen van gebruikers info");
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {verifiedUser ? (
        <>
          <ClientStatus id={userInfo.id} plan={userInfo.plan} />
          <Typography className="my-3" variant="h5">
            Menu kaarten
          </Typography>
          <ListedCodes />
          <AddDialog />
        </>
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
