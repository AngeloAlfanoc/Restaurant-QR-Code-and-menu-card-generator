import { db } from "./firebase";

/*
@Adds Auth UID to store.
@uid is param
*/

export async function addToStore(uid: string, name: string, userid: string) {
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

export async function listDataStore(userid: string) {
  return await db
    .collection("menuCards")
    .where("menuOwner", "==", userid)
    .get();
}
