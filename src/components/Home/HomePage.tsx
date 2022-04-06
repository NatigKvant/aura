// @ts-ignore
import React from 'react'
import './HomePage.scss'
// @ts-ignore
import { Sidebar } from '../Sidebar/Sidebar.tsx'
// @ts-ignore
import { Feed } from '../Feed/Feed.tsx'
// @ts-ignore
import { Widgets } from '../Widgets/Widgets.tsx'

export const HomePage: React.FC = () => {
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