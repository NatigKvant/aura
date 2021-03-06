
import React from 'react'
import './FriendsPage.scss'
import { Avatar } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'

export const StyledBadge = styled(Badge)(({ theme, status }: any): any => ({
  '& .MuiBadge-badge': status === 'Online' ? {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
  } : {
    backgroundColor: 'grey',
    color: '#44b700',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
  },

}))

export interface FriendPagePropsType {
  users: any
}

export interface Data {
  name: string
  email: string
  status: string
  userId: number | string
  photoUrl: string
}

export const FriendsPage: React.FC<FriendPagePropsType> = ({ users }) => {
  return (
    <div className='friendsPage_container'>
      <div className='friendsPage'>
        <div className='friendsPage_content'>
          {users.map((user: Data) =>
            <div className='user'
                 key={user.userId}>
              <StyledBadge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
                // @ts-ignore
                status={user.status}
              >
                <Avatar src={user.photoUrl} />
              </StyledBadge>
              <div>
                {user.name}
              </div>
            </div>,
          )}
        </div>
      </div>
    </div>
  )
}