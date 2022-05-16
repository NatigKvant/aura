// @ts-nocheck
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
import { selectUser } from '../../features/authSlice'
import TextField from '@material-ui/core/TextField'
import { throttle } from 'lodash'

export const Feed: React.FC = () => {
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
  }, [])

  const sendPost = useCallback(throttle(async () => {
    if (input !== '') {
      await db.collection('posts').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setInput('')
    }
  }, 3000, { 'trailing': false }), [input, user])

  const postHandleSubmit = (e) => {
    e.preventDefault()
    sendPost()
  }

  return (
    <form onSubmit={postHandleSubmit}>
      <div className='feedContainer'>
        <div className='feed'>
          <div className='feed_inputContainer'>
            <div className='feed_input'>
              <CreateIcon />
              <TextField
                inputProps={{
                  style:
                    {
                      color: '#ff6200',
                      border: '1px solid #ff6200',
                      boxShadow: '1px 0px 2px #aaaa98',
                      disableUnderline: true,
                      border: 'none'
                    },
                }}
                variant={'outlined'}
                fullWidth
                size='small'
                rowsMax={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
          <div className='post_container'>
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
      </div>
    </form>
  )
}