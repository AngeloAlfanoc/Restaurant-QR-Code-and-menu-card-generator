import { UserContext, UserInfoContext } from "../../contexts/userContext";
import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Button, Typography } from "@material-ui/core";
import ClientStatus from "../../components/clientStatus";
import ListedConsumers from "../../components/listedConsumers";
import ListedCodes from "../../components/listedMenus";
import ClientRegistrationDialog from "../../components/clientRegistration";
import { db } from "../../services/firebase";
import Loader from "../../components/loader";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { CHECKINS } from "../../constants/routes";
const Dashboard = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
  const [verifiedUser, setVerified] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
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
            }
          }
          setPublicInfo(tempLoad[0]);
          setLoading(false);
        });
    }
  }, [userInfo]);
  return (
    <main className="admin">
      {loading && <Loader />}
      {error && <Alert severity={"warning"}>{error}</Alert>}
      {userInfo && (
        <>
          {verifiedUser ? (
            <>
              <ClientStatus
                id={userInfo.id}
                plan={userInfo.plan}
                company={userInfo.company}
              />

              <Typography className="mt-5 mb-1" component={"h1"} variant="h5">
                Overzicht Check-ins
              </Typography>

              {publicInfo && (
                <>
                  <ListedConsumers
                    tools={false}
                    docid={publicInfo.docid}
                    range={5}
                  />
                  <Button
                    onClick={() => history.push(CHECKINS)}
                    className="mt-3"
                  >
                    Meer weergeven
                  </Button>
                </>
              )}

              <Typography className="mt-5 mb-1" component={"h1"} variant="h5">
                Overzicht Menu Kaarten
              </Typography>
              <ListedCodes tools={false} />
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
