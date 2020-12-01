import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ClientRegistrationDialog from "../../components/clientRegistration";
import ListedConsumers from "../../components/listedConsumers";
import ClientStatus from "../../components/clientStatus";
import { db } from "../../services/firebase";
import { Alert } from "@material-ui/lab";
import Loader from "../../components/loader";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setCurrentStep } from "../../redux/actions";
export default function CheckIns() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
  const [verifiedUser, setVerified] = useState<boolean>(false);
  const userInfo = useSelector((state: RootStateOrAny) => state.userInfo);
  dispatch(setCurrentStep("viewCheckin"));
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
            }
          }
          setPublicInfo(tempLoad[0]);
          setLoading(false);
        });
    }
  }, [userInfo]);

  return (
    <main className="admin">
      {error && <Alert severity="error">{error}</Alert>}
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
      {loading && <Loader />}
    </main>
  );
}
