// @ts-nocheck
import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'


const Message: React.FC = forwardRef<HTMLInputElement>(
  ({ name, description, message, photoUrl, userId, user }: any, ref) => {

    return (
      <div
        ref={ref} className={userId === user.uid ? 'myChatMessage' : 'message'}>
        <div className='message_header'>
          <Avatar className='avatar' src={photoUrl}>{name[0]}</Avatar>
          <div className='message_info'>
            <h2>{name}</h2>
          </div>
        </div>
        <div className='message_body'>
          <p>{message}</p>
        </div>
      </div>
    )
  },
)

export default Message