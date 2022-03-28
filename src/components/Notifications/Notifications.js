import React from 'react';
import "./Notifications.css";

const Notifications = ({notificationsOpen}) => {
    return (
        <div className={notificationsOpen ? "notifications" : "none"}
             onClick={(e) => e.stopPropagation()}
        >
            <div className='notifications_content'>
                Welcome To Aura Project
            </div>
        </div>
    );
}

export default Notifications;
