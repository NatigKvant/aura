import React, {useEffect, useState} from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import {db} from "../Firebase/firebase";
import firebase from 'firebase/compat/app'
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import FlipMove from "react-flip-move";
import TextField from "@material-ui/core/TextField";

function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
    }, []);

    const sendPost = (e) => {
        if (e.key === "Enter" && input !== "") {
            db.collection("posts").add({
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoUrl || "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setInput("");
        }
    };

    const postHandleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={postHandleSubmit}>
            <div className="feed">
                <div className="feed_inputContainer">
                    <div className="feed_input">
                        <CreateIcon/>
                        <TextField
                            variant={"outlined"}
                            fullWidth
                            size="small"
                            rowsMax={2}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={sendPost}
                            type="text"
                        />
                    </div>
                    <div className="feed_inputOptions">
                        <InputOption Icon={ImageIcon} title="photo" color="#606060"/>
                        <InputOption
                            Icon={SubscriptionsIcon}
                            title="video"
                            color="#606060"
                        />
                        <InputOption Icon={EventNoteIcon} title="Event" color="#606060"/>
                        <InputOption
                            Icon={CalendarViewDayIcon}
                            title="Write article"
                            color="#606060"
                        />
                    </div>
                </div>
                <FlipMove>
                    {posts.map(
                        ({id, data: {name, description, message, photoUrl}}) => (
                            <Post
                                key={id}
                                name={name}
                                description={description}
                                message={message}
                                photoUrl={photoUrl}
                            />
                        )
                    )}
                </FlipMove>
            </div>
        </form>
    );
}

export default Feed;
