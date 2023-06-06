import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of users collection in Firestore
const USERS_COLLECTION = 'users';

/* 
 Adds new user profile to Firestore with null values
*/
export function addUserProfile(uid) {
  addDoc(collection(db, USERS_COLLECTION), { uid, username: "", bio: ""});
}

export function updateUserProfile(uid, username, bio ) {
  updateDoc(doc(db, USERS_COLLECTION, uid), { username, bio });
}

export async function getUser(uid) {
  const userDetails = query(collection(db, USERS_COLLECTION), where("uid", "==", uid));
  const snapshot = await getDocs(userDetails);

  let allDetails = [];
  for (const documentSnapshot of snapshot.docs) {
    const users = documentSnapshot.data();
    await allDetails.push({
      ...users, 
      username: users['username'], 
      bio: users['bio'],
    });
  }
  return allDetails;
}