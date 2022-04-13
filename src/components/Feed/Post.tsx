// @ts-nocheck
import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import './Feed.scss'
import { Avatar } from '@material-ui/core'
import InputOption from './InputOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

const Post: React.FC = forwardRef<HTMLInputElement>(({ name, description, message, photoUrl }: any, ref) => {

  const [likesCount, setLikesCount] = useState(0)

  const handleLike = useCallback(() => {
    setLikesCount(likesCount + 1)
  }, [likesCount])


  useEffect(() => {
    const raw = localStorage.getItem('likesCount')
    setLikesCount(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('likesCount', JSON.stringify(likesCount))
  }, [likesCount])

  setTimeout(() => {
    localStorage.setItem('likesCount', JSON.stringify(0))
  }, 60000)

  // const now = new Date()
  // const expire = new Date((now.getTime() + 600_000))
  // if (new Date() > expire) {
  //   localStorage.setItem('likesCount', JSON.stringify(0))
  // }

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
          <IconButton className='inputButton'
                      size='small'
                      aria-label='show more'
                      aria-haspopup='true'
                      color='inherit'
                      onClick={handleLike}>
            <InputOption Icon={ThumbUpAltOutlinedIcon} title='Like' />
          </IconButton>
        </Badge>
        <IconButton className='inputButton'
                    size='small'
                    aria-label='show more'
                    aria-haspopup='true'
                    color='inherit'>
          <InputOption Icon={ChatOutlinedIcon} title='Comment' />
        </IconButton>
        <IconButton className='inputButton'
                    size='small'
                    aria-label='show more'
                    aria-haspopup='true'
                    color='inherit'>
          <InputOption Icon={ShareOutlinedIcon} title='Share' />
        </IconButton>
        <IconButton className='inputButton'
                    size='small'
                    aria-label='show more'
                    aria-haspopup='true'
                    color='inherit'>
          <InputOption Icon={SendOutlinedIcon} title='Send' />
        </IconButton>
      </div>
    </div>
  )
})

export default Post