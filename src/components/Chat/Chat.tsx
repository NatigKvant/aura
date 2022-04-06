// @ts-ignore
import React, { useEffect, useState, useRef, useCallback } from 'react'
import './Chat.scss'
// @ts-ignore
import { db } from '../Firebase/firebase.ts'
import firebase from 'firebase/compat/app'
// @ts-ignore
import Message from './Message.tsx'

export const Chat: React.FC = ({ chatOpen, messages, setMessages, user }) => {

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
    return () => {
      console.log('unsubscribed')
    }
  }, [setMessages])

  const sendMessage = useCallback(async (e) => {
    if (e.key === 'Enter' && input !== '') {
      console.log(user)
      await db.collection('messages').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
      })
      setInput('')
    }
  }, [user, input])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={chatOpen ? 'chat' : 'none'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='smallChat'>
          <div className='middleSmallChat'>
            <div className='incomingMessages'>
              {messages.map(
                ({
                   id,
                   data: { name, description, message, photoUrl, userId },
                 }) => (
                  <Message
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
          <div className='footer'>
            <input
              className='smallChatInput'
              type='text'
              placeholder='Type a message...'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={sendMessage}
            />
          </div>
        </div>
      </div>
    </form>
  )
}