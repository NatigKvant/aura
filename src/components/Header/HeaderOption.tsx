// @ts-nocheck
import React from 'react'
import './Header.scss'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/authSlice'

export const HeaderOption: React.FC = ({ avatar, Icon, title, onClick }) => {
  const user = useSelector(selectUser)

  return (
    <div onClick={onClick} className='headerOption'>
      {Icon && <Icon className={'headerOption_icon'} />}
      {avatar && <Avatar className='sidebar_avatar' src={user?.photoUrl} />}
      <h3 className='headerOption_title'>{title}</h3>
    </div>
  )
}