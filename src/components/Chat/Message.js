import React, { forwardRef } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const SampleMessage = forwardRef(
  ({ name, description, message, photoUrl, userId }, ref) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={userId === user.uid ? "myChatMessage" : "message"}
      >
        <div className="message_header">
          <Avatar src={photoUrl}>{name[0]}</Avatar>
          <div className="message_info">
            <h2>{name}</h2>
          </div>
        </div>
        {/*<div className="message_body">
          <p>{message}</p>
        </div>*/}
        <div className="message_body">
          <p>{message}</p>
        </div>
      </div>
    );
  }
);

export default SampleMessage;
