import React from 'react'
import './HomePage.scss'
import { Sidebar } from '../Sidebar/Sidebar'
import { Feed } from '../Feed/Feed'
import { Widgets } from '../Widgets/Widgets'

export const HomePage = () => {
  return (
    <div className='homePage'>
      <div className='homePageContent'>
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </div>
  )
}