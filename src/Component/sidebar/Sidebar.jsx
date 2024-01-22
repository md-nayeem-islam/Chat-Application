import React from 'react'
import '../sidebar/sidebar.css'
import { NavLink } from 'react-router-dom'
import logout from '../../images/logout.png'
import user from '../../images/loginuser.jpg'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";



const Sidebar = () => {
  return (
    <>
        <div className="sideBarBox">
            <div className="sidebarImg">
                <img src={user} alt="not found" />
            </div>
            <div className="sidebarcompnent">
              <ul className='navigation'>
                <li>
                  <NavLink to='/home'>
                    <IoHomeOutline />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/message'>
                    <AiOutlineMessage />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/notification'>
                    <IoIosNotificationsOutline />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/settings'>
                     <IoSettingsOutline />
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="sidebarLogout">
              <NavLink>
                <img src={logout} alt="not found" />
              </NavLink>

            </div>
        </div>
    </>
  )
}

export default Sidebar