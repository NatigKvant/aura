import React from 'react'
import './Sidebar.scss'
import {Avatar} from '@material-ui/core'
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'


const Sidebar = () => {
    const user = useSelector(selectUser)

    return (
        <div className='sidebar'>
            <div className='sidebar_top'>
                <img src='https://img5.goodfon.ru/wallpaper/nbig/d/1e/dark-metal-waves-textures-fon-tiomnyi-volny.jpg'
                     alt=''/>
                <Avatar src={user.photoUrl} className='sidebar_avatar'>
                    {user.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className='sidebar_stats'>
                <div className='sidebar_stat'>
                    <p>Who viewed you</p>
                    <p className='sidebar_statNumber'>2,543</p>
                </div>
                <div className='sidebar_stat'>
                    <p>Views on post</p>
                    <p className='sidebar_statNumber'>2,448</p>
                </div>
            </div>
            <div className='sidebar_bottom'>
                <p>Recent :</p>
                <p>React</p>
                <p>Programming</p>
                <p>Java Script</p>
                <p>Development</p>
            </div>

        </div>
    )
}

export default Sidebar;