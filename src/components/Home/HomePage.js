import React from 'react'
import './HomePage.scss'
import { Sidebar } from '../Sidebar/Sidebar'
import { HomeContent } from './HomeContent'
import { Widgets } from '../Widgets/Widgets'

export const HomePage = () => {
  return (
    <div className='homePage'>
      <Sidebar />
      <HomeContent />
      <Widgets />
    </div>
  )
}