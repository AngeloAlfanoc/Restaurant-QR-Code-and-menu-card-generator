import { Box, Container, Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setItemImageRefConsumer, setMenuCardItems } from "../../../redux/actions";
// import { itemPrice } from "../../redux/initialState";
import { db } from "../../../services/firebase";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { toggleItemImageDialogConsumer } from "../../../redux/actions";
import ViewItemImageConsumer from "../../dialogs/viewItemImageConsumer";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      marginTop:"20px"
    },
    paper: {
      width: 100 + "%",
      padding: theme.spacing(4),
      textAlign: "center",
    },
  })
);
export default function ConsumerMenuCard(props: { menu: string; user: string | null }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { menuCardItems } = useSelector((state: RootStateOrAny) => state);

  useEffect(() => {
    return db
      .collection("menus")
      .doc(props.menu)
      .collection("items")
      .orderBy("position", "asc")
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
          } catch {}
        }
        if (snapshot.size === 0) {
          tempLoad.push({
            type: "Deze menu kaart heeft nog geen items...",
          });
        }
        dispatch(setMenuCardItems(tempLoad));
      });
  }, [props.menu, dispatch]);
  const handleClick = (image: string) => {
    dispatch(toggleItemImageDialogConsumer(true));
    dispatch(setItemImageRefConsumer(image));
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          {menuCardItems &&
            // eslint-disable-next-line array-callback-return
            menuCardItems.map((item) => {
              switch (item.type) {
                case "title":
                  return (
                    <Grid item md={12}>
                      <h2>{item.title}</h2>
                      <hr></hr>
                    </Grid>
                  );

                case "item":
                  return (
                    <Box>
                      <Grid onClick={() => handleClick(item.image)} className="d-flex justify-content-between my-3 hover" item xs={12} sm={12}>
                        <Box className="d-flex flex-column justify-content-start align-items-start">
                          <span>{item.title}</span>
                          <small style={{ paddingRight: "10px" }} className="text-left">
                            {item.description}
                          </small>
                        </Box>
                        <span>€{item.price}</span>
                      </Grid>
                    </Box>
                  );
                default:
                  break;
              }
            })}
        </Paper>
      </Grid>
      <ViewItemImageConsumer user={props.user} />
    </Container>
  );
}
