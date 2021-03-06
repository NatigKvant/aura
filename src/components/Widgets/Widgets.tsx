// @ts-nocheck
import React from 'react'
import './Widgets.scss'
import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

export const Widgets: React.FC = () => {

  const newsArticle = (heading, subtitle) => (
    <div className='widgets_article'>
      <div className='widgets_articleLeft'>
        <FiberManualRecordIcon />
      </div>
      <div className='widgets_articleRight'>
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )
  return (
    <div className='widgets'>
      <div className='widgets_header'>
        <h2>News</h2>
        <div className='infoIcon'>
          <InfoIcon />
        </div>
      </div>
      {newsArticle('Welcome aboard', 'Mechanism is back...')}
      {newsArticle('Top News', 'reading...')}
      {newsArticle('New genres', 'music is coming...')}
      {newsArticle('Progressive', 'House,Techno...')}
    </div>
  )
}