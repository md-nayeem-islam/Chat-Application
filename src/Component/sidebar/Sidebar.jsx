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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaCloudUploadAlt } from "react-icons/fa";



const Sidebar = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Upload Profile Photo</h3>
          <div className="imgHolder">
          <img src={data && data.photoURL} alt="not found" />
          </div>
          <input type="file" />
        </Box>
      </Modal>
    </div>
        <div className="sideBarBox">
          <div className='img'>
            <div className="sidebarImg">
                <img src={data && data.photoURL} alt="not found" />
                <div className="overLay" onClick={handleOpen}><FaCloudUploadAlt />
</div>
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