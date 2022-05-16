import React from 'react'
import './LeftMenu.scss'

interface LeftMenuProps {
}

export const LeftMenu: React.FC<LeftMenuProps> = ({}) => {
  return (
    <div className='leftMenu'>
      <div className='left_menu_content'>
        Menu
      </div>
    </div>
  )
}