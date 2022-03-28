import React, {useEffect, useState, memo} from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import {db, auth} from "./components/Firebase/firebase";
import Chat from "./components/Chat/Chat";
import HomePage from "./components/Home/HomePage";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import SampleChat from "./components/SampleChat/SampleChat";
import Notifications from "./components/Notifications/Notifications";
import LeftMenu from "./components/LeftMenu/LeftMenu";


const App = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [chatOpen, setChatOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [leftMenuOpen, setLeftMenuOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const usersRef = db.collection('users');
            const snapshot = await usersRef.get();
            snapshot.forEach(doc => {

                const data = doc.data()

                setUsers((users) => {
                    return [...users, data]
                })
            })
        })()
    }, [])

    useEffect(() => {
        db.collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
    }, []);


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
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    const closePopups = () => {
        setNotificationsOpen(false);
        setChatOpen(false);
        setLeftMenuOpen(false);
    };

    return (
        <BrowserRouter>
            <div className="app">
                <Header
                    chatOpen={chatOpen}
                    setChatOpen={setChatOpen}
                    notificationsOpen={notificationsOpen}
                    setNotificationsOpen={setNotificationsOpen}
                    leftMenuOpen={leftMenuOpen}
                    setLeftMenuOpen={setLeftMenuOpen}
                    messages={messages}
                />
                {!user ? (
                    <Login/>
                ) : (
                    <div className="app_body" onClick={closePopups}>
                        <Chat chatOpen={chatOpen}
                              messages={messages}
                              setMessages={setMessages}
                        />
                        <Notifications notificationsOpen={notificationsOpen}/>
                        <LeftMenu leftMenuOpen={leftMenuOpen}/>

                        <Switch>
                            <Route path="/feed" render={() => <Feed/>}/>
                            <Route path="/messages" render={() => <SampleChat users={users}/>}/>
                            <Route path="/homepage" render={() => <HomePage/>}/>
                            <Route path="/friendspage" render={() => <FriendsPage users={users}/>}/>
                        </Switch>
                    </div>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
