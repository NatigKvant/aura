import React from 'react';
import "./LeftMenu.scss";

const LeftMenu = ({leftMenuOpen}) => {
    return (
        <div className={leftMenuOpen ? "leftMenu" : "none"}
             onClick={(e) => e.stopPropagation()}
        >
            <div className='left_menu_content'>
                Menu
            </div>
        </div>
    );
}

export default LeftMenu;
