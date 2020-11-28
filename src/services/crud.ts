import { db } from "./firebase";
import {
  IAddMenuItem,
  IAddMenuCard,
  IAddAccountInfo,
  AccountInfoStore,
  IncludedTos,
} from "../types";
/*
@Adds new menu object to store.
@uid is param
*/

export async function addAccountInfoToStore({ uid, email }: IAddAccountInfo) {
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
The purpose of this function is to add additional client information extended docid.
*/

export async function verifyAccountInfoInStore({
  company,
  vat,
  phone,
  location,
  tos,
  docid,
}: IncludedTos) {
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

export async function updateAccountInfoInStore({
  company,
  vat,
  phone,
  location,
  docid,
}: AccountInfoStore) {
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

export async function addMenuCardToStore({
  uid,
  name,
  userid,
  selfRefLink,
  selfRef,
  qrcode,
}: IAddMenuCard) {
  if (selfRef) {
    return db.collection("menus").add({
      menuOwner: userid,
      menuCardName: name,
      menuCardId: uid,
      qrcode: qrcode,
      link: selfRefLink,
      ref: selfRef,
      createdAt: Date.now(),
      editedAt: Date.now(),
      published: false,
    });
  } else {
    return db.collection("menus").add({
      menuOwner: userid,
      menuCardName: name,
      menuCardId: uid,
      qrcode: qrcode,
      ref: selfRef,
      createdAt: Date.now(),
      editedAt: Date.now(),
      published: false,
    });
  }
}

/*
@Get delete card with given card id
@card uid is param
*/

export async function rmDataStore(collection: string, document: string) {
  return await db
    .collection(collection)
    .doc(document)
    .delete()
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

/*
@Get delete card with given card id
@card uid is param
*/
// todo change name
export async function rmDataStoreSub(
  collection: string,
  document: string,
  subCollection: string,
  subDocument: string
) {
  return await db
    .collection(collection)
    .doc(document)
    .collection(subCollection)
    .doc(subDocument)
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
@Adds new public users object to store
@uid is param
*/

export async function addPublicCompanyData(id: string, ownerId: string) {
  return db.collection("checkins").add({
    id: id,
    owner: ownerId,
    published: false,
    createdAt: Date.now(),
  });
}

/*
@Adds checkin data to checkin object
@id is document id, rest of object in userdata.
*/

export async function addCheckinData(
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: number,
  datetime: number
) {
  return db.collection("checkins").doc(id).collection("items").add({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    created: datetime,
  });
}

/*
@Adds Menu items to menu cards
@id is documentid , rest of object is data provided by selection
*/

export async function addMenuItemData({
  id,
  type,
  title,
  itemTitle,
  itemPrice,
  other,
}: IAddMenuItem) {
  if (type === "title") {
    return db.collection("menus").doc(id).collection("items").add({
      title: title,
      type: type,
    });
  }
  if (type === "item") {
    return db.collection("menus").doc(id).collection("items").add({
      item: itemTitle,
      price: itemPrice,
      type: type,
    });
  }
  if (type === "other") {
    return db.collection("menus").doc(id).collection("items").add({
      other: other,
      type: type,
    });
  }
}
