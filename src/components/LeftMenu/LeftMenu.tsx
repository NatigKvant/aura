// @ts-ignore
import React from 'react'
import './LeftMenu.scss'

export const LeftMenu: React.FC = ({ leftMenuOpen }) => {
  return (
    <div className={leftMenuOpen ? 'leftMenu' : 'none'}
         onClick={(e) => e.stopPropagation()}
    >
      <div className='left_menu_content'>
        Menu
      </div>
    </div>
  )
}