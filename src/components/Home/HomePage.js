import React from 'react';
import "./HomePage.css";
import Sidebar from "../Sidebar/Sidebar";
import HomeContent from "./HomeContent";
import Widgets from "../Widgets/Widgets";

const HomePage = () => {
    return (
        <div className='homePage'>
            <Sidebar/>
            <HomeContent/>
            <Widgets/>
        </div>
    );
}

export default HomePage;
