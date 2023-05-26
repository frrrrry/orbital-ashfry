import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log(`useProtectedRoute useEffect called`);
    const inAuthGroup = segments[0] === "(auth)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user && !inAuthGroup) {
      console.log(`inAuthGroup: ${inAuthGroup}`);
      // Redirect to the front page.
      router.replace("/frontpage");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments, router]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useProtectedRoute(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log('fail');
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, logIn, signUp, logOut, resetPassword}}
  >{children}</ AuthContext.Provider>
}

export function useUserAuth() {
  return useContext(AuthContext);
}