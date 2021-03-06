import React, { useEffect } from "react";
import "./index.scss";
import { Button, Typography } from "@material-ui/core";
import ClientStatus from "../../components/misc/clientStatus";
import ListedConsumers from "../../components/lists/listedConsumers";
import ListedCodes from "../../components/lists/listedMenus";
import ClientRegistrationDialog from "../../components/forms/clientRegistration";
import { db } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import { CHECKINS } from "../../constants/routes";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setLoading, setPublicUserInfo } from "../../redux/actions";

const Dashboard = () => {
  const { userInfo, publicInfo } = useSelector((state: RootStateOrAny) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (userInfo) {
      if (userInfo.id) {
        userInfo.id && db
        .collection("checkins")
        .where("owner", "==", userInfo.id)
        .onSnapshot((snapshot) => {
          const tempLoad = [];
          if (snapshot.size) {
            try {
              snapshot.forEach((doc) => {
                tempLoad.push({ ...doc.data(), docid: doc.id });
              });
            } catch {}
          }
          dispatch(setPublicUserInfo(tempLoad[0]));
          dispatch(setLoading(false));
        });
      }
    }


  }, [userInfo, dispatch]);

  return (
    <main className="admin">
      {userInfo && (
        <>
          {userInfo.verified ? (
            <>
              <ClientStatus id={userInfo.id} plan={userInfo.plan} company={userInfo.company} />

              <Typography className="mt-5 mb-1" component={"h1"} variant="h5">
                Overzicht Check-ins
              </Typography>

              {publicInfo && (
                <>
                  <ListedConsumers tools={false} docid={publicInfo.docid} range={5} />
                  <Button onClick={() => history.push(CHECKINS)} className="mt-3">
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
