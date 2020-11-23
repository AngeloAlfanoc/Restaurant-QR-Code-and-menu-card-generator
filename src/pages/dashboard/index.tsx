import { UserContext, UserInfoContext } from "../../contexts/usercontext";
import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Typography } from "@material-ui/core";
import ClientStatus from "../../components/clientStatus";
import ListedConsumers from "../../components/listedConsumers";
import ListedCodes from "../../components/listedCodes";
import ClientRegistrationDialog from "../../components/clientRegistration";
const Dashboard = () => {
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
      {userInfo && (
        <>
          {verifiedUser ? (
            <>
              <ClientStatus id={userInfo.id} plan={userInfo.plan} company={userInfo.company} />
              <Typography className="my-2" component={"h1"} variant="h5">
                Overzicht Check-ins
              </Typography>
              <ListedConsumers />
              <Typography className="my-2" component={"h1"} variant="h5">
                Overzicht Menu Kaarten
              </Typography>
              <ListedCodes />
            </>
          ) : (
            <ClientRegistrationDialog id={userInfo.docid} />
          )}
        </>
      )}
    </main>
  );
};

export default Dashboard;
