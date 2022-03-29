import React, { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import { Feed } from './components/Feed/Feed'
import { Login } from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import { db, auth } from './components/Firebase/firebase'
import { HomePage } from './components/Home/HomePage'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { FriendsPage } from './components/FriendsPage/FriendsPage'
import { SampleChat } from './components/SampleChat/SampleChat'

export const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  const [chatOpen, setChatOpen] = useState(false)
  const [leftMenuOpen, setLeftMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  console.log(chatOpen)

  useEffect(() => {
    (async () => {
      const usersRef = db.collection('users')
      const snapshot = await usersRef.get()
      snapshot.forEach(doc => {
        const data = doc.data()
        setUsers((users) => {
          return [...users, data]
        })
      })
    })()
  }, [])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      )
  }, [])


  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is Logged In
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
      <div className='app'>
        {!user ? (
          <Login />
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
            />
            <Switch>
              <div className='app_body' onClick={closePopups}>
                <Route path='/feed' render={() => <Feed />} />
                <Route path='/messages' render={() => <SampleChat users={users}
                                                                  messages={messages}
                                                                  setMessages={setMessages}
                                                                  user={user} />} />
                <Route path='/homepage' render={() => <HomePage />} />
                <Route path='/friendspage' render={() => <FriendsPage users={users} />} />
              </div>
            </Switch>
          </div>
        )}
      </div>
    </BrowserRouter>
  )
}