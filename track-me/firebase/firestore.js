import { setDoc, addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of collection in Firestore
const USERS_COLLECTION = 'users';
const TRANSACTION_COLLECTION = 'transactions'
 
// Adds new user profile to Firestore with null values
export function addUserProfile(uid) {
  setDoc(doc(db, USERS_COLLECTION, uid), { uid, username: "", bio: ""});
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

// Adds new transactionto Firestore
export function addTransaction(uid, type, date, category, amount, note) {
  addDoc(collection(db, TRANSACTION_COLLECTION), { uid, type, date, category, amount, note});
}