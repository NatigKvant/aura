import React, {useEffect, useState, useRef, useCallback} from "react";
import "./SampleChat.css";
import {db} from "../Firebase/firebase";
import firebase from 'firebase/compat/app'
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import SampleMessage from "../SampleChat/SampleMessage";
import {Avatar} from "@material-ui/core";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const StyledBadge = styled(Badge)(({theme, users}) => ({
    "& .MuiBadge-badge": users ? {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
        } : {
            backgroundColor: "grey",
            color: "#44b700",
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
            }
}));


/*console.log(firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid))*/


const SampleChat = ({users}) => {

    const user = useSelector(selectUser);
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    /*const initialState = {
        user: user,
        isOnline: false
    }

    function reducer(state = initialState, action) {
        switch (action.type) {
            case 'isOnline':
                return {isOnline: true};
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    if(user) {
        dispatch({type: 'isOnline'})
    }

    console.log(state)*/

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const sendMessage = useCallback((e) => {
        if (e.key === "Enter" && input !== "") {
            db.collection("messages").add({
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoUrl || "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userId: user.uid,
            });
            setInput("");
        }
    }, [input, user.displayName, user.email, user.photoUrl, user.uid, setInput])

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container1">
                <div className="chatBox">
                    <div className="top-bar">
                        <div className="userAvatar">
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                variant="dot"
                                users={users}
                            >
                                <Avatar src={user.photoUrl}/>
                            </StyledBadge>
                        </div>
                        <h3>{user.displayName}</h3>
                    </div>
                    <div className="middle">
                        <div className="incoming">
                            {messages.map(
                                ({
                                     id,
                                     data: {name, description, message, photoUrl, userId },
                                 }) => (
                                    <SampleMessage
                                        key={id}
                                        name={name}
                                        description={description}
                                        message={message}
                                        photoUrl={photoUrl}
                                        userId={userId}
                                    />
                                )
                            )}
                            <div ref={messagesEndRef}/>
                        </div>
                    </div>
                    <div className="bottom-bar">
                            <input
                                className="input1"
                                type="text"
                                placeholder="Type a message..."
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                onKeyPress={sendMessage}
                            />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SampleChat;
