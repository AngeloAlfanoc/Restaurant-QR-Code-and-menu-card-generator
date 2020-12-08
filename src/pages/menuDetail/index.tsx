import ConsumerMenuCard from "../../components/consumerMenuCard";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
export default function MenuDetail(props: any) {
  const [doc, setDoc] = useState<string>(null);
  const [user, setUser] = useState<string>(null);
  useEffect(() => {
    db.collection("menus")
      .where("menuCardId", "==", props.match.params.id)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          setDoc(doc.id);
          setUser(doc.data().menuOwner);
        });
      });
  }, [props.match.params.id, doc]);
  return <>{doc && user && <ConsumerMenuCard menu={doc} user={user} />}</>;
}
