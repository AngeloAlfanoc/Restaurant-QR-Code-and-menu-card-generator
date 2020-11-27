import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";

export default function ConsumerMenuCard(props: { menu: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [rows, setRows] = useState<any>(null);
  const [doc, setDoc] = useState<string>(null);
  useEffect(() => {
    setLoading(true);

    db.collection("menus")
      .where("menuCardId", "==", props.menu)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          setDoc(doc.id);
        });
      });
  }, [props.menu]);

  return <div>test</div>;
}
