import React from 'react'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import group from '../../images/group.jpg'
import './Grouplist.css'

const GroupList = () => {
  return (
    <div>
        <GroupCard cardtitle='Group List'>
        {[0,1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='usermainbox'>
            <div className="userItem">
                <div className="userimgBox">
                    <img src={group} alt="not found" />
                </div>
                <div className="userinfo">
                    <div className="userName">
                    <h4>Kulsuma</h4>
                    <p>Mern Developer</p>
                    </div>
                    <div className="joinbtn">
                    <button>Join</button>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </GroupCard>
    </div>
  )
}

export default GroupList