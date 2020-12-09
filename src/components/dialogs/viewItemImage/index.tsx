import React, { useEffect, useState } from "react";
import { DialogContent, DialogContentText, Dialog } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setLoading, toggleItemImageDialog } from "../../../redux/actions";
import { storage } from "../../../services/firebase";
export default function ViewItemImage() {
  const { toggleDialog, itemImageRef, userInfo } = useSelector((state: RootStateOrAny) => state);

  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(null);

  useEffect(() => {
    dispatch(setLoading(true));
    if (userInfo && itemImageRef) {
      const companyRef = storage.ref().child(userInfo.company);
      const image = companyRef.child(itemImageRef);
      image.getDownloadURL().then((image) => {
        setImage(image);
      });
      dispatch(setLoading(false));
    }
  }, [userInfo, userInfo.company, toggleDialog, itemImageRef, dispatch]);

  return (
    <Dialog open={toggleDialog} onClose={() => dispatch(toggleItemImageDialog(false))}>
      <DialogContent>
        <DialogContentText>
          {image && <img alt="menu-card-item" style={{ maxWidth: "300px" }} src={image}></img>}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
