import React from 'react'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import blockuser from '../../images/blockuser.jpg'

const BlockUser = () => {
  return (
    <div>
          <GroupCard cardtitle='Block Users'>
        {[0,1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='usermainbox'>
            <div className="userItem">
                <div className="userimgBox">
                    <img src={blockuser} alt="not found" />
                </div>
                <div className="userinfo">
                    <div className="userName">
                    <h4>Kulsuma</h4>
                    <p>Mern Developer</p>
                    </div>
                    <div className="joinbtn">
                    <button>Unblock</button>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </GroupCard>
    </div>
  )
}

export default BlockUser