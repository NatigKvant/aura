import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'

export const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email: any, password: any) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // @ts-ignore
        setUser(response.user)
        return response.user
      })
  }
  const signup = (email: any, password: any) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // @ts-ignore
        setUser(response.user)
        return response.user
      })
  }
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // @ts-ignore
        setUser(false)
      })
  }
  const sendPasswordResetEmail = (email: any) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true
      })
  }
  const confirmPasswordReset = (code: any, password: any) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true
      })
  }
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        setUser(user)
      } else {
        // @ts-ignore
        setUser(false)
      }
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}