import { db } from "./firebase";

/*
@Adds Auth UID to store.
@uid is param
*/

export async function addDataStore(uid: string, name: string, userid: string) {
  return db.collection("menuCards").add({
    menuOwner: userid,
    menuCardName: name,
    menuCardId: uid,
    menuCardItems: {},
    createdAt: Date.now(),
    editedAt: Date.now(),
  });
}

/*
@Get card code is equal to user id
@uid is param
*/

export async function getDataStore(userid: string) {
  return await db.collection("menuCards").where("menuOwner", "==", userid);
}

/*
@Get delete card with given card id
@card uid is param
*/

export async function remDataStore(document: string) {
  return await db
    .collection("menuCards")
    .doc(document)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
