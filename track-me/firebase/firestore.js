import { setDoc, addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where, deleteDoc, getDoc } from 'firebase/firestore'; 
import { db, storage } from './firebase';
import { getDownloadURL } from './storage';

// Name of collection in Firestore
const USERS_COLLECTION = 'users';
const TRANSACTION_COLLECTION = 'transactions'
const SUBWALLET_COLLECTION = 'subwallets'

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
export function addTransaction(uid, type, date, category, amount, note) {
  addDoc(collection(db, TRANSACTION_COLLECTION), { uid, type, date, category, amount, note});
}

//get all transaction details based on uid
export async function getTransactions(uid) {
  const transactionQuery = query(collection(db, TRANSACTION_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
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
      id: documentSnapshot.id
    });
  }
  return allTransactions;
}

// update specific transaction with given id
export function updateTransaction(id, type, date, category, amount, note ) {
  updateDoc(doc(db, TRANSACTION_COLLECTION, id), { type, date, category, amount, note });
}

// Deletes transactions with given id.
export function deleteTransaction(id) {
  deleteDoc(doc(db, TRANSACTION_COLLECTION, id));
}

// adds new subwallet to firestore
export function addWallet(uid, title, totalAmount, currAmount, note, startDate, endDate) {
  addDoc(collection(db, SUBWALLET_COLLECTION), { uid, title, totalAmount, currAmount, note, startDate, endDate});
}

// get all subwallet details from uid
export async function getWallet(uid) {
  const walletQuery = query(collection(db, SUBWALLET_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
  const snapshot = await getDocs(walletQuery); 

  let allWallets = [];
  for (const documentSnapshot of snapshot.docs) {
    const wallets = documentSnapshot.data();
    allWallets.push({
      ...wallets, 
      title: wallets['title'], 
      totalAmount: parseFloat(wallets['totalAmount']).toFixed(2), 
      currAmount: parseFloat(wallets['currAmount']).toFixed(2),
      note: wallets['note'],
      startDate: wallets['startDate'].toDate(),
      endDate: wallets['endDate'].toDate(),
      id: documentSnapshot.id
    });
  }
  return allWallets;
}

// update specifc subwallet with given uid
export function updateWallet(id, title, totalAmount, currAmount, note, startDate, endDate ) {
  updateDoc(doc(db, SUBWALLET_COLLECTION, id), { title, totalAmount, currAmount, note, startDate, endDate });
}

// deletes subwallet with given uid
export function deleteWallet(id) {
  deleteDoc(doc(db, SUBWALLET_COLLECTION, id));
}