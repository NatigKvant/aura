// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import './SampleChat.scss'
import { db } from '../Firebase/firebase'
import { fireBase } from '../Firebase/firebase'
import SampleMessage from './SampleMessage'
import { Avatar } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import { throttle } from 'lodash'

export const StyledBadge = styled(Badge)(({ theme, users }) => ({
  '& .MuiBadge-badge': users ? {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
  } : {
    backgroundColor: 'grey',
    color: '#44b700',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
  },
}))

export interface SampleChatPropsType {
  users: any
  setMessages: (value: any) => void
  messages: any
  user: any
}

export const SampleChat: React.FC<SampleChatPropsType> = ({ users, messages, setMessages, user }) => {
  const messagesEndRef = useRef(null)
  const [input, setInput] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      )
  }, [])

  const sendMessage = useCallback(throttle(async () => {
    if (input !== '') {
      await db.collection('messages').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: fireBase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
      })
      setInput('')
    }
  }, 3000, { 'trailing': false }), [user, input])

  const messageHandleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <form onSubmit={messageHandleSubmit}>
      <div className='container'>
        <div className='chatBox'>
          <div className='top-bar'>
            <div className='userAvatar'>
              <StyledBadge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
                users={users}
              >
                <Avatar src={user.photoUrl} />
              </StyledBadge>
            </div>
            <h3>{user.displayName}</h3>
          </div>
          <div className='messagesContainer'>
            <div className='messages'>
              {messages.map(
                ({
                   id,
                   data: { name, description, message, photoUrl, userId },
                 }) => (
                  <SampleMessage
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                    userId={userId}
                    user={user}
                  />
                ),
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className='bottom-bar'>
            <input
              className='input'
              type='text'
              placeholder='Type a message...'
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
        </div>
      </div>
    </form>
  )
}