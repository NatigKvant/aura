import React, {useEffect, useState, useRef} from "react";
import "./Chat.css";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {db} from "../Firebase/firebase";
import firebase from 'firebase/compat/app'
import Message from "./Message";

const Chat = ({chatOpen, messages}) => {
    const user = useSelector(selectUser);
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"});
    };

    const sendMessage = async (e) => {
        if (e.key === "Enter" && input !== "") {
            await db.collection("messages").add({
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
            <div
                className={chatOpen ? "chat" : "none"}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="chatbox">
                    <div className="middleSmallChat">
                        <div className="incoming">
                            {messages.map(
                                ({
                                     id,
                                     data: {name, description, message, photoUrl, userId},
                                 }) => (
                                    <Message
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
                        {/*<div className="outgoing"></div>*/}
                        {/*<div className="typing">
                <div className="bubble">
                  <div className="ellipsis one"></div>
                  <div className="ellipsis two"></div>
                  <div className="ellipsis three"></div>
                </div>
              </div>*/}
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

export default Chat;
