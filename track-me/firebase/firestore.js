import { setDoc, addDoc, collection, doc, getDocs, orderBy, query, 
  updateDoc, where, deleteDoc, getDoc } from 'firebase/firestore'; 
import { db, storage } from './firebase';
import { getDownloadURL } from './storage';

// Name of collection in Firestore
const USERS_COLLECTION = 'users';
const TRANSACTION_COLLECTION = 'transactions'
 
// Adds new user profile to Firestore with null values
export function addUserProfile(uid) {
  setDoc(doc(db, USERS_COLLECTION, uid), { uid, username: "", bio: "", avatar: null });
}

export function updateUserProfile(uid, username, bio, avatar ) {
  updateDoc(doc(db, USERS_COLLECTION, uid), { username, bio, avatar });
}

export async function getUser(uid) {
  //const docRef = doc(db, USERS_COLLECTION, uid);
  const userDetails = query(collection(db, USERS_COLLECTION), where("uid", "==", uid));
  const snapshot = await getDocs(userDetails);
  
  let allDetails = [];
  for (const documentSnapshot of snapshot.docs) {
    const users = documentSnapshot.data();
    await allDetails.push({
      ...users, 
      username: users['username'], 
      bio: users['bio'],
      avatar: users['avatar'],
      uid: users['uid']
    });
  }
  return allDetails;
}

// Adds new transaction to Firestore
export function addTransaction(uid, type, date, category, amount, note, month, year) {
  addDoc(collection(db, TRANSACTION_COLLECTION), { uid, type, date, category, amount, note, month, year});
}

//get all transaction details based on uid and month
export async function getTransactions(uid) {
  let transactionQuery = query(collection(db, TRANSACTION_COLLECTION), 
  where("uid", "==", uid),
  orderBy("date", "desc"));
  const snapshot = await getDocs(transactionQuery); 

  let allTransactions = [];
  for (const documentSnapshot of snapshot.docs) {
    const transactions = documentSnapshot.data();
    allTransactions.push({
      ...transactions, 
      type: transactions['type'], 
      date: transactions['date'].toDate(),
      category: transactions['category'],
      amount: transactions['amount'], 
      note: transactions['note'],
      id: documentSnapshot.id, 
      month: transactions['month'],
      year: transactions['year']
    });
  }
  return allTransactions;
}

// update specific transaction with given id
export function updateTransaction(id, type, date, category, amount, note, month, year ) {
  updateDoc(doc(db, TRANSACTION_COLLECTION, id), { type, date, category, amount, note, month, year });
}

// Deletes transactions with given id.
export function deleteTransaction(id) {
  deleteDoc(doc(db, TRANSACTION_COLLECTION, id));
}