import { db } from "./firebase";

/*
@Adds Auth UID to store.
@uid is param
*/

export async function addDataStore(uid: string, name: string, userid: string) {
  return db.collection("menus").add({
    menuOwner: userid,
    menuCardName: name,
    menuCardId: uid,
    menuCardItems: {},
    createdAt: Date.now(),
    editedAt: Date.now(),
    published: false,
  });
}

/*
@Get card code is equal to user id
@uid is param
*/

export async function getDataStore(userid: string) {
  return await db.collection("menus").where("menuOwner", "==", userid);
}

/*
@Get delete card with given card id
@card uid is param
*/

export async function remDataStore(document: string) {
  return await db
    .collection("menus")
    .doc(document)
    .delete()
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

/*
@Edit Field name in firestore docs
@Using params provided by components
*/

export async function editFieldInStoreObject(id: string) {
  return db.collection("menuCards").doc(id);
}
