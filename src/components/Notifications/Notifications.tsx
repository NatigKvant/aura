import React from 'react'
import './Notifications.scss'

interface NotificationsPropsType {

}

export const Notifications: React.FC<NotificationsPropsType> = ({}) => {
  return (
    <div className='notifications'>
      <div className='notifications_content'>
        Welcome To Aura Project
      </div>
    </div>
  )
}