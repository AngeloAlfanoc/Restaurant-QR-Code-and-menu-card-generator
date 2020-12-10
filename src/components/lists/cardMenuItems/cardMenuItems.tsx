import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  setError,
  setMenuCardItems,
  setLoading,
  setMenuCardItemsCounter,
  setToggleItemImageDialog,
  setItemImageRef,
} from "../../../redux/actions";
import { rmDataStoreSub } from "../../../services/crud";
import { db } from "../../../services/firebase";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ImageIcon from "@material-ui/icons/Image";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import ViewItemImage from "../../dialogs/viewItemImage";
import "./index.scss";
import { editFieldInSubStoreObject } from "../../../services/crud";

export default function CardMenuItems() {
  const dispatch = useDispatch();
  const { selectedCardMenuRef, menuCardItems } = useSelector((state: RootStateOrAny) => state);
  const [dragStart, setDragStart] = useState<number>(null);
  const [dragStartId, setDragStartId] = useState<string>(null);
  const [dragEnd, setDragEnd] = useState<number>(null);
  const [dragEndId, setDragEndId] = useState<string>(null);
  const handleDelete = (document: string) => {
    try {
      dispatch(setLoading(true));
      rmDataStoreSub("menus", selectedCardMenuRef, "items", document);
    } catch (e) {
      dispatch(setError(e));
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    return db
      .collection("menus")
      .doc(selectedCardMenuRef)
      .collection("items")
      .orderBy("position", "asc")
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
            dispatch(setMenuCardItemsCounter(tempLoad.length));
          } catch {
            dispatch(setError("Probleem bij het ophalen van menu items, contacteer uw systeem beheerder."));
          }
        }
        if (snapshot.size === 0) {
          tempLoad.push({
            title: "Uw heeft nog geen items in het menu staan.",
          });
          dispatch(setMenuCardItemsCounter(0));
        }
        dispatch(setMenuCardItems(tempLoad));
      });
  }, [selectedCardMenuRef, dispatch]);

  const handleClick = (image: string) => {
    dispatch(setItemImageRef(image));
    dispatch(setToggleItemImageDialog(true));
  };
  const handleDrag = (e: React.DragEvent<HTMLDivElement> , position: number, doc: string) => {
    e.preventDefault();
    setDragEnd(position);
    setDragEndId(doc);
    console.log(e.currentTarget.style.backgroundColor = "#fcfdff")
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number, doc: string) => {
    e.preventDefault();
    setDragStart(position);
    setDragStartId(doc);
    console.log(e.currentTarget.style.backgroundColor = "#fff")
  };
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.style.backgroundColor = "#fff")
    editFieldInSubStoreObject("menus", selectedCardMenuRef, "items", dragStartId, dragEnd);
    editFieldInSubStoreObject("menus", selectedCardMenuRef, "items", dragEndId, dragStart);
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Inhoud van het item</TableCell>
            <TableCell>Prijs</TableCell>
            <TableCell>Beschrijving</TableCell>
            <TableCell>
              <BurstModeIcon />
            </TableCell>
            <TableCell align="right">Acties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="item__table">
          {menuCardItems &&
            menuCardItems.map((item, i) => {
              return (
                <TableRow draggable={true} key={i}  onDragOver={(e) => handleDrag(e, item.position, item.docid)}
                onDragLeave={(e) => handleDragStart(e, item.position, item.docid)}
                onDrop={handleDrop}>
                  <TableCell
                  
                  >
                    {item.title}
                  </TableCell>
                  {item.type === "title" ? (
                    <>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <IconButton disabled={true} color="default" onClick={() => handleClick(item.image)}>
                          <ImageIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item.price && "€ " + item.price}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {item.docid && (
                          <>
                            <IconButton color="primary" onClick={() => handleClick(item.image)}>
                              <ImageIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </>
                  )}

                  <TableCell align="right">
                    {item.docid && (
                      <IconButton
                        className="p-1"
                        onClick={() => handleDelete(item.docid)}
                        color="secondary"
                        size="medium"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <ViewItemImage />
    </>
  );
}
