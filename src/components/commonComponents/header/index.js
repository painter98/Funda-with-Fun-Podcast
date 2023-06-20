import React from 'react';
import './style.css';
import {Link,useLocation} from 'react-router-dom';

function Header(){
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navbar'>
           <div className='gradient'></div>
           <div className='links'>
                <Link to='/' className={currentPath==='/'?'active':''}>Signup</Link>
                <Link to='/podcast' className={currentPath==='/podcast'?'active':''}>Podcasts</Link>
                <Link to='/create-podcast' className={currentPath==='/create-podcast'?'active':''}>Start a Podcasts</Link>
                <Link to='/profile' className={currentPath==='/profile'?'active':''}>Profile</Link>
           </div>
        </div>
    )
}
export default Header;