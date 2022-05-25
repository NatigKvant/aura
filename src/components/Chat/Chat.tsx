// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import './Chat.scss'
import { fireBase } from '../Firebase/firebase'
import firebase from 'firebase/compat/app'
import Message from './Message'
import { throttle } from 'lodash'

interface ChatPropsType {
  messages: any
  user: any
}

export const Chat: React.FC<ChatPropsType> = ({
                                                messages,
                                                user,
                                              }) => {
  const messagesEndRef = useRef(null)
  const [input, setInput] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const firestore = fireBase.firestore()

  const sendMessage = useCallback(throttle(async () => {
    if (input !== '') {
      await firestore.collection('messages').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
      <div>
        <div className='smallChat'>
          <div className='middleSmallChat'>
            <div className='incomingMessages'>
              {messages.map(
                ({
                   name, description, message, photoUrl, userId,
                 }, index) => (
                  <Message
                    key={index}
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
          <div className='footer'>
            <input
              className='smallChatInput'
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