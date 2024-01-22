import React from 'react'
import friend from '../../images/friend.jpg'
import GroupCard from '../../Component/home/groupCard/GroupCard'

const Friend = () => {
  return (
    <div>
          <GroupCard cardtitle='Friend'>
    {[0,1,2,3,4,5,6].map((item,index)=>(
    <div key={index} className='usermainbox'>
        <div className="userItem">
            <div className="userimgBox">
                <img src={friend} alt="not found" />
            </div>
            <div className="userinfo">
                <div className="userName">
                <h4>Kulsuma</h4>
                <p>Mern Developer</p>
                </div>
                <div className="messageSeenTime">
                <p>Today,8:56 pm</p>
                </div>
            </div>
        </div>
    </div>
    ))}
    </GroupCard>
    </div>
  )
}

export default Friend