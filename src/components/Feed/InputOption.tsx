// @ts-nocheck
import React from 'react'
import './Feed.scss'

const InputOption: React.FC = ({ Icon, title, color }) => {
  return (
    <div className='inputOption'>
      <Icon style={{ color: color }} />
      <p>{title}</p>
    </div>
  )
}

export default InputOption
