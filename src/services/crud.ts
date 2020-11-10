import { db } from "./firebase";

/*
@Adds Auth UID to store.
@uid is provided by useAuth hook
*/

export async function addToStore(uid: string) {
  return db.collection("users").doc(uid);
}
