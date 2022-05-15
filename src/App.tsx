import React, { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import { Login } from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/authSlice'
import { db, auth } from './components/Firebase/firebase'
import { HomePage } from './components/Home/HomePage'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { FriendsPage } from 'components/FriendsPage/FriendsPage'
import { SampleChat } from './components/SampleChat/SampleChat'
import { Register } from './components/Login/Register'
import { Spinner } from './components/Spinner/Spinner'
import { useActions } from './hooks/useActions'

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
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { login, logout } = useActions()

  console.log(user)

  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [chatOpen, setChatOpen] = useState(false)
  const [leftMenuOpen, setLeftMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

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
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(({ docs }: any) =>
        setMessages(
          docs.map((doc: any): { data: Message; id: number | string } => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      )
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

  const closePopups = () => {
    setNotificationsOpen(false)
    setChatOpen(false)
    setLeftMenuOpen(false)
  }

  return (
    <BrowserRouter>
      {!isLoading ? <Spinner /> :
        <div className='app'>
          {!user ? (
            <>
              <Switch>
                <Route path='/login' render={() => <Login isLoading={isLoading}
                                                          setIsLoading={setIsLoading}
                />} />
                <Route exact path='/register' render={() => <Register isLoading={isLoading}
                                                                      setIsLoading={setIsLoading}
                />} />
              </Switch>
            </>
          ) : (
            <div>
              <Header
                messages={messages}
                setMessages={setMessages}
                user={user}
                chatOpen={chatOpen}
                leftMenuOpen={leftMenuOpen}
                notificationsOpen={notificationsOpen}
                setChatOpen={setChatOpen}
                setLeftMenuOpen={setLeftMenuOpen}
                setNotificationsOpen={setNotificationsOpen}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <Switch>
                <React.Fragment>
                  <div className='app_body' onClick={closePopups}>
                    <Route path='/messages' render={() => <SampleChat users={users}
                                                                      messages={messages}
                                                                      setMessages={setMessages}
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