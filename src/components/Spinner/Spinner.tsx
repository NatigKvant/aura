import React from 'react'
import './Spinner.scss'

export const Spinner = () => {
  return (
    <div className='loading_page_container'>
      <div className='loading_page'>
        <div className='spinner'>
          <span className='loader' />
        </div>
      </div>
    </div>
  )
}