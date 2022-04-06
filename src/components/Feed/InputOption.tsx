// @ts-ignore
import React from 'react'
import './Feed.scss'

const InputOption: React.FC = ({ Icon, title, color }) => {
  return (
    <div className='inputOption'>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

export default InputOption
