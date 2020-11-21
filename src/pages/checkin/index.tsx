import React, { useEffect, useState } from "react";

import { db } from "../../services/firebase";
import ConsumerCheckIn from "../../components/consumerCheckin";
import ConsumerCheckinDisabled from "../../components/consumerCheckinDisabled";
import Loader from "../../components/loader";
export default function CheckInPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
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

    return () => {
      unsubscribe();
    };
  }, [props.match.params.id]);

  const TemplateView = () => {
    switch (publicInfo.published) {
      case true:
        return (
          <ConsumerCheckIn collection="checkins" docid={publicInfo.docid} />
        );

      case false:
        return <ConsumerCheckinDisabled />;
      default:
        break;
    }
  };

  return (
    <>
      {publicInfo && <TemplateView />}
      {loading && <Loader />}
    </>
  );
}