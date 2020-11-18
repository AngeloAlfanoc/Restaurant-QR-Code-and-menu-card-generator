import { db } from "./firebase";

/*
@Adds new menu object to store.
@uid is param
*/

export async function addAccountInfoToStore(uid: string, email: string) {
  return db.collection("users").add({
    id: uid,
    plan: "free",
    role: "client",
    email: email,
    verified: false,
    createdAt: Date.now(),
    editedAt: Date.now(),
  });
}

/*
@Adds new menu object to store.
@uid is param
*/

export async function VerifyAccountInfoInStore(
  company: string,
  vat: string,
  location: string,
  phone: string,
  docid: string
) {
  const object = {
    company: company,
    vat: vat,
    location: location,
    phone: phone,
    verified: true,
    editedAt: Date.now(),
  };

  return db
    .collection("users")
    .doc(docid)
    .set(JSON.parse(JSON.stringify(object)), { merge: true });
}

/*
@Adds new menu object to store.
@uid is param
*/

export async function addMenuCardToStore(
  uid: string,
  name: string,
  userid: string
) {
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
@Get delete card with given card id
@card uid is param
*/
// todo change name
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
  return db.collection("menus").doc(id);
}
