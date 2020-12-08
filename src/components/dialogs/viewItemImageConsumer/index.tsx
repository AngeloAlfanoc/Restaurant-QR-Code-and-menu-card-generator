import React, { useEffect, useState } from "react";
import { DialogContent, DialogContentText, Dialog } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setLoading, toggleItemImageDialogConsumer } from "../../../redux/actions";
import { db, storage } from "../../../services/firebase";
export default function ViewItemImage(props: { user: string }) {
  const toggleDialog = useSelector((state: RootStateOrAny) => state.toggleItemImageDialogConsumer);
  const itemImageRef = useSelector((state: RootStateOrAny) => state.itemImageConsumerRef);
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(null);
  const [company, setCompany] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        db.collection("users")
          .where("id", "==", props.user)
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              setCompany(doc.data().company);
              setLoading(false);
            });
          });

        const companyRef = storage.ref().child(company);
        const image = companyRef.child(itemImageRef);
        image.getDownloadURL().then((image) => {
          setImage(image);
        });
      }
    } catch (e) {
      setError(e);
      throw new Error(e);
    } finally {
      return function cleanup() {
        mounted = false;
      };
    }
  }, [toggleDialog, itemImageRef, dispatch, props.user, company, image]);

  return (
    <Dialog open={toggleDialog && toggleDialog} onClose={() => dispatch(toggleItemImageDialogConsumer(false))}>
      <DialogContent>
        <DialogContentText>
          {image && <img alt="menu-card-item" style={{ maxWidth: "300px" }} src={image}></img>}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
