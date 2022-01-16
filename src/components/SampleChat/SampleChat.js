import React, {useEffect, useState, useRef} from "react";
import "./SampleChat.css";
import {db} from "../Firebase/firebase";
import firebase from 'firebase/compat/app'
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import SampleMessage from "../SampleChat/SampleMessage";
import {Avatar} from "@material-ui/core";

const SampleChat = () => {
    const user = useSelector(selectUser);
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

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

    const sendMessage = (e) => {
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container1">
                <div className="chatbox">
                    <div className="top-bar">
                        <div className="userAvatar">
                            <Avatar src={user.photoUrl}/>
                        </div>
                        <h3>{user.displayName}</h3>
                    </div>
                    <div className="middle">
                        <div className="incoming">
                            {messages.map(
                                ({
                                     id,
                                     data: {name, description, message, photoUrl, userId},
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

                            {/*<div className="typing">
                <div className="bubble">
                  <div className="ellipsis one"></div>
                  <div className="ellipsis two"></div>
                  <div className="ellipsis three"></div>
                </div>
              </div>*/}
                        </div>
                        <div className="outgoing"></div>
                    </div>
                    <div className="bottom-bar">
                        <div>
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
            </div>
        </form>
    );
};

export default SampleChat;
