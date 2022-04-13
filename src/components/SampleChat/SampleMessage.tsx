// @ts-nocheck
import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'

const SampleMessage: React.FC = forwardRef<HTMLInputElement>(
  ({ name, description, message, photoUrl, userId, user }: any, ref) => {

    return (
      <div
        ref={ref} className={userId === user.uid ? 'myMessage' : 'message'}>
        <div className='message_header'>
          <Avatar src={photoUrl}>{name[0]}</Avatar>
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

export default SampleMessage
