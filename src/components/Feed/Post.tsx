// @ts-ignore
import React, { forwardRef, useState, useCallback, useEffect } from 'react'
import './Feed.scss'
import { Avatar } from '@material-ui/core'
// @ts-ignore
import InputOption from './InputOption.tsx'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { db } from '../Firebase/firebase'

const Post: React.FC = forwardRef<HTMLInputElement>(({ name, description, message, photoUrl }: any, ref) => {

  const [likesCount, setLikesCount] = useState(0)

  const handleLike = useCallback(() => {
    setLikesCount(likesCount + 1)
  }, [likesCount])


  useEffect(() => {
    const raw = localStorage.getItem('likesCount') || null
    setLikesCount(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('likesCount', JSON.stringify(likesCount))

    return () => {
      console.log('unsubscribed')
    }
  }, [likesCount])

  setTimeout(() => {
    localStorage.setItem('likesCount', JSON.stringify(0))
  }, 60000)

  return (
    <div ref={ref} className='post'>
      <div className='post_header'>
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className='post_info'>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className='post_body'>
        <p>{message}</p>
      </div>

      <div className='post_buttons'>
        <Badge badgeContent={likesCount} color='primary'>
          <button className='inputButton' onClick={handleLike}>
            <InputOption Icon={ThumbUpAltOutlinedIcon} title='Like' />
          </button>
        </Badge>
        <button className='inputButton'>
          <InputOption Icon={ChatOutlinedIcon} title='Comment' />
        </button>
        <button className='inputButton'>
          <InputOption Icon={ShareOutlinedIcon} title='Share' />
        </button>
        <button className='inputButton'>
          <InputOption Icon={SendOutlinedIcon} title='Send' />
        </button>
      </div>
    </div>
  )
})

export default Post