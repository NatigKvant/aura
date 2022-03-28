import React, { useEffect, useState, useCallback } from 'react'
import './Feed.scss'
import CreateIcon from '@material-ui/icons/Create'
import InputOption from './InputOption'
import ImageIcon from '@material-ui/icons/Image'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import Post from './Post'
import { db } from '../Firebase/firebase'
import firebase from 'firebase/compat/app'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import TextField from '@material-ui/core/TextField'

export const Feed = () => {
  const user = useSelector(selectUser)
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      )
  }, [setPosts])

  const sendPost = useCallback((e) => {
    if (e.key === 'Enter' && input !== '') {
      db.collection('posts').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setInput('')
    }
  }, [input, user.displayName, user.email, user.photoUrl, setInput])

  const postHandleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={postHandleSubmit}>
      <div className='feedContainer'>
        <div className='feed'>
          <div className='feed_inputContainer'>
            <div className='feed_input'>
              <CreateIcon />
              <TextField
                variant={'outlined'}
                fullWidth
                size='small'
                rowsMax={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={sendPost}
                type='text'
              />
            </div>
            <div className='feed_inputOptions'>
              <InputOption Icon={ImageIcon} title='photo' color='#606060' />
              <InputOption
                Icon={SubscriptionsIcon}
                title='video'
                color='#606060'
              />
              <InputOption Icon={EventNoteIcon} title='Event' color='#606060' />
              <InputOption
                Icon={CalendarViewDayIcon}
                title='Write article'
                color='#606060'
              />
            </div>
          </div>
          {posts.map(
            ({ id, data: { name, description, message, photoUrl } }) => (
              <Post
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
            ),
          )}
        </div>
      </div>
    </form>
  )
}