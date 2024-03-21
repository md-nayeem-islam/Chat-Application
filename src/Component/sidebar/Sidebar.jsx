import React  from 'react'
import '../sidebar/sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import logout from '../../images/logout.png'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { auth } from '../../firebase/FirebaseConfig'
import { signOut, getAuth } from '@firebase/auth'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';


const Sidebar = () => {
 const data = useSelector((state) => state.loginUserData.value) 
 const navigate = useNavigate();
 const auth = getAuth();
 const dispatch = useDispatch();


  const handleLogout = async () =>{
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(loginUser(null))
    navigate("/")
    
  }
  const userInfo = auth.currentUser;
  const a = localStorage.getItem('user') 
  // console.log(a);
  return (
    <>
        <div className="sideBarBox">
          <div className='img'>
            <div className="sidebarImg">
                <img src={data && data.photoURL} alt="not found" />
            </div>
            <h2 className='sidbarName'>{data && data.displayName}</h2>
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
                <img onClick={handleLogout} src={logout} alt="not found" />
              </NavLink>

            </div>
        </div>


    </>
  )
}

export default Sidebar