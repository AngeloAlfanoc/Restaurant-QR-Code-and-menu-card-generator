import React, { useEffect, useState } from "react";

import { db } from "../../services/firebase";
import ConsumerCheckIn from "../../components/forms/consumerCheckin";
import ConsumerCheckinDisabled from "../../components/forms/consumerCheckinDisabled";
import { Alert } from "@material-ui/lab";
import { setLoading } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function CheckInPage(props: any) {
  const [error, setError] = useState<string>();
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("checkins")
      .where("owner", "==", props.match.params.id)
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
          } catch {
            setError("Probleem bij het ophalen van restaurant gegevens gelieve je systeem beheerd te contacteren.");
          } finally {
            setLoading(false);
          }
        }
        setPublicInfo(tempLoad[0]);
        setLoading(false);
      });

    if (publicInfo && !loaded) {
      setLoaded(true);
    }
    if (loaded) {
      unsubscribe();
      setLoading(false);
    }
    return () => {
      unsubscribe();
    };
  }, [props.match.params.id, dispatch, loaded, publicInfo]);

  const TemplateView = () => {
    switch (publicInfo.published) {
      case true:
        return <ConsumerCheckIn collection="checkins" docid={publicInfo.docid} />;

      case false:
        return <ConsumerCheckinDisabled />;
      default:
        break;
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && <>{publicInfo && <TemplateView />}</>}
    </>
  );
}
