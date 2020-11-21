import { db } from "./firebase";

/*
@Adds new menu object to store.
@uid is param
*/

export async function addAccountInfoToStore(uid: string, email: string) {
  return db.collection("users").add({
    id: uid,
    plan: "Gratis",
    role: "client",
    email: email,
    verified: false,
    createdAt: Date.now(),
    editedAt: Date.now(),
  });
}

/*
@Adds new users object to store
@uid is param
*/

export async function VerifyAccountInfoInStore(
  company: string,
  vat: string,
  phone: string,
  location: string,
  tos: string,
  docid: string
) {
  const object = {
    company: company,
    vat: vat,
    location: location,
    phone: phone,
    verified: true,
    tos: tos,
    editedAt: Date.now(),
  };

  return db
    .collection("users")
    .doc(docid)
    .set(JSON.parse(JSON.stringify(object)), { merge: true });
}

/*
@UpdateClientSettings
@uid is param
*/

export async function UpdateAccountInfoInStore(
  company: string,
  vat: string,
  phone: string,
  location: string,
  docid: string
) {
  const object = {
    company: company,
    vat: vat,
    location: location,
    phone: phone,
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

export async function editFieldInStoreObject(id: string, collection: string) {
  return db.collection(collection).doc(id);
}

/*
@Get restaurant client checkin
@uid is param
*/

export async function GetRestaurantInfo(id: string) {
  return db.collection("users").where("id", "==", id);
}

/*
@Adds new public users object to store
@uid is param
*/

export async function addPublicBusinessData(id: string, ownerId: string) {
  return db.collection("checkins").add({
    id: id,
    owner: ownerId,
    published: false,
    createdAt: Date.now(),
  });
}
