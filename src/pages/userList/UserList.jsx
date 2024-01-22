import React from 'react'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import user from '../../images/user.jpg'
import { FaPlus } from 'react-icons/fa'
import './userlist.css'
const UserList = () => {
  return (
    <>
    <GroupCard cardtitle='User List'>
    {[0,1,2,3,4,5,6].map((item,index)=>(
    <div key={index} className='usermainbox'>
        <div className="userItem">
            <div className="userimgBox">
                <img src={user} alt="not found" />
            </div>
            <div className="userinfo">
                <div className="userName">
                <h4>Kulsuma</h4>
                <p>Mern Developer</p>
                </div>
                <div className="userbtn">
                <FaPlus />
                </div>
            </div>
        </div>
    </div>
    ))}
    </GroupCard>
    </>
  )
}

export default UserList