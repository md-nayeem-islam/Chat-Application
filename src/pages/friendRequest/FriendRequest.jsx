import React from 'react'
import friendrequiest from '../../images/friendrequiest.jpg'
import GroupCard from '../../Component/home/groupCard/GroupCard'

const FriendRequest = () => {
  return (
    <div>
            <GroupCard cardtitle='Friend Requiest'>
        {[0,1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='usermainbox'>
            <div className="userItem">
                <div className="userimgBox">
                    <img src={friendrequiest} alt="not found" />
                </div>
                <div className="userinfo">
                    <div className="userName">
                    <h4>Kulsuma</h4>
                    <p>Mern Developer</p>
                    </div>
                    <div className="joinbtn">
                    <button>Accept</button>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </GroupCard>
    </div>
  )
}

export default FriendRequest