import React, { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import { Login } from './components/Login/Login'
import { useDispatch } from 'react-redux'
import { db, auth, fireBase } from './components/Firebase/firebase'
import { HomePage } from './components/Home/HomePage'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { FriendsPage } from 'components/FriendsPage/FriendsPage'
import { SampleChat } from './components/SampleChat/SampleChat'
import { Register } from './components/Login/Register'
import { Spinner } from './components/Spinner/Spinner'
import { useActions } from './hooks/useActions'
import { useAuth } from './hooks/useAuth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


export interface Message {
  email: string
  userId: number
}

export interface Data {
  name: string
  email: string
  status: string
  userId: number | string
  photoUrl: string
}

export const App: React.FC = () => {

  const firestore = fireBase.firestore()
  const user = useAuth()
  const dispatch = useDispatch()
  const { login, logout } = useActions()

  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('timestamp', 'asc'),
  )

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const initializeApp = () => {
    return <Redirect to={'/login'} />
  }

  useEffect(() => {
    (async () => {
      const usersRef = db.collection('users')
      const snapshot = await usersRef.get()
      snapshot.forEach(doc => {
        const data: Data = doc.data() as Data
        setUsers((users: Data[]): any => {
          return [...users, data]
        })
      })
    })()
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setIsLoading(true)
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          }),
        )
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      {user === null && initializeApp()}
      {!isLoading ? <Spinner /> :
        <div className='app'>
          {!user ? (
            <>
              <Switch>
                <Route path='/login' render={() => <Login isLoading={isLoading}
                                                          setIsLoading={setIsLoading}
                />} />
                <Route path='/register' render={() => <Register isLoading={isLoading}
                                                                setIsLoading={setIsLoading}
                />} />
              </Switch>
            </>
          ) : (
            <div>
              <Header
                messages={messages}
                user={user}
                setIsLoading={setIsLoading}
              />
              <Switch>
                <React.Fragment>
                  <div className='app_body'>
                    <Route path='/messages' render={() => <SampleChat users={users}
                                                                      messages={messages}
                                                                      user={user} />} />
                    <Route path='/homepage' render={() => <HomePage />} />
                    <Route path='/friendspage' render={() => <FriendsPage users={users} />} />
                  </div>
                </React.Fragment>
              </Switch>
            </div>
          )}
        </div>
      }
    </BrowserRouter>
  )
}