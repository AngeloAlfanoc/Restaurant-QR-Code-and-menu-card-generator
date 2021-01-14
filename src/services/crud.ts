import { db } from "./firebase";

/*
@Adds new menu object to store.
@uid is param
*/ 

export const addAccountInfoToStore = async (uid: string, email: string) => {
  return db.collection("users").add({
    id: uid,
    plan: "Gratis",
    role: "client",
    email: email,
    verified: false,
    createdAt: Date.now(),
    editedAt: Date.now(),
  });
};

/*
@Adds new users object to store
@uid is param
The purpose of this function is to add additional client information extended docid.
*/

export const verifyAccountInfoInStore = async (
  company: string,
  vat: string,
  phone: string,
  location: string,
  tos: string,
  docid: string
) => {
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
};

/*
@UpdateClientSettings
@uid is param
*/

export const updateAccountInfoInStore = async (
  company: string,
  vat: string,
  phone: string,
  location: string,
  docid: string
) => {
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
};

/*
@Adds new menu object to store.
@uid is param
*/

export const addMenuCardToStore = async (
  uid: string,
  name: string,
  userid: string,
  selfRefLink: string | undefined,
  selfRef: boolean,
  qrcode: boolean
) => {
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
};

/*
@Get delete card with given card id
@card uid is param
*/

export const rmDataStore = async (collection: string, document: string) => {
  return await db
    .collection(collection)
    .doc(document)
    .delete()
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

/*
@Get delete card with given card id
@card uid is param
*/
// todo change name
export const rmDataStoreSub = async (
  collection: string,
  document: string,
  subCollection: string,
  subDocument: string
) => {
  return await db
    .collection(collection)
    .doc(document)
    .collection(subCollection)
    .doc(subDocument)
    .delete()
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

/*
@Edit Field name in firestore docs
@Using params provided by components
*/

export const editFieldInStoreObject = async (id: string, collection: string) => {
  return db.collection(collection).doc(id);
};

/*
@Edit Field name in firestore docs sub collection
@Using params provided by components
*/

export const editFieldInSubStoreObject = async (
  collection: string,
  docId:string,
  sub: string,
  docSubId: string,
  position: number
) => {
  const object = {
    position: position,
    edited: Date.now(),
  }
  return db.collection(collection).doc(docId).collection(sub).doc(docSubId).set(JSON.parse(JSON.stringify(object)), { merge: true });
};

/*
@Adds new public users object to store
@uid is param
*/

export const addPublicCompanyData = async (id: string, ownerId: string) => {
  return db.collection("checkins").add({
    id: id,
    owner: ownerId,
    published: false,
    createdAt: Date.now(),
  });
};

/*
@Adds checkin data to checkin object
@id is document id, rest of object in userdata.
*/

export const addCheckinData = async (
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: number,
  datetime: number
) => {
  return db.collection("checkins").doc(id).collection("items").add({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    created: datetime,
  });
};

/*
@Adds Menu items to menu cards
@id is documentid , rest of object is data provided by selection
*/

export const addMenuItemData = async (
  docid: string,
  type: string,
  itemTitle: string,
  itemDescr: string,
  itemPrice: number | null,
  itemImage: string | null,
  position: number
) => {
  if (type === "title") {
    return db.collection("menus").doc(docid).collection("items").add({
      title: itemTitle,
      price: null,
      description: null,
      image: null,
      type: type,
      position: position,
    });
  }
  if (type === "item") {
    return db.collection("menus").doc(docid).collection("items").add({
      title: itemTitle,
      price: itemPrice,
      description: itemDescr,
      image: itemImage,
      type: type,
      position: position,
    });
  }
};

export const getMenuItemData = async (id: string) => {
  return db
    .collection("menus")
    .doc(id)
    .collection("items")
    .onSnapshot((snap) => {
      if (snap.size) {
        try {
          snap.forEach((doc) => {
            console.log(doc.data());
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
};
