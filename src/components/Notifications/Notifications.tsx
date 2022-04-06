// @ts-ignore
import React from 'react'
import './Notifications.scss'

export const Notifications: React.FC = ({ notificationsOpen }) => {
  return (
    <div className={notificationsOpen ? 'notifications' : 'none'}
         onClick={(e) => e.stopPropagation()}
    >
      <div className='notifications_content'>
        Welcome To Aura Project
      </div>
    </div>
  )
}