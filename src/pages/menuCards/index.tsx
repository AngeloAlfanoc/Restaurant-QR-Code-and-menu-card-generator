import "./index.scss";

import ListedCodes from "../../components/listedMenus";
import { Typography } from "@material-ui/core";

import AddDialog from "../../components/addMenuCardDialog";
import React, { useContext, useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import { UserInfoContext } from "../../contexts/userContext";
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
          <Typography className="my-3" variant="h5">
            Menu kaarten
          </Typography>
          <ListedCodes tools={true} />
          <AddDialog />
        </>
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
