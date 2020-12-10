import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setItemImageRef, setLoading, setToggleItemImageDialog } from "../../../redux/actions";
import { storage } from "../../../services/firebase";
export default function ViewItemImage() {
  const { toggleItemImageDialog, itemImageRef, userInfo } = useSelector((state: RootStateOrAny) => state);

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
     
    }
    dispatch(setLoading(false));
  }, [userInfo, userInfo.company, toggleItemImageDialog, itemImageRef, dispatch]);

  const handleProductImage = () => {
    dispatch(setToggleItemImageDialog(false));
    dispatch(setItemImageRef(null));
    setImage(null);
  };

  return (
    <Dialog open={toggleItemImageDialog} onClose={handleProductImage}>
      <DialogContent>
        <DialogContentText>
          {image ? <img alt="menu-card-item" style={{ maxWidth: "500px" }} src={image}></img> : <CircularProgress />}
        </DialogContentText>
        <DialogActions>
          <Box className="d-flex justify-content-end">
            <Button name="cancel" onClick={handleProductImage} color="primary">
              Sluiten
            </Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
