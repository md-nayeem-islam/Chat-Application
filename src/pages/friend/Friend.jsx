import React, { useEffect, useState } from 'react'
import friend from '../../images/friend.jpg'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'; 
import '../friend/friend.css'

const Friend = () => {
  const db = getDatabase();
  const [friendList, setfriendList] = useState();
  const data = useSelector((state) => state.loginUserData.value);


  useEffect(()=>{ 
    const friendRef = ref(db,'Frieds');
    onValue(friendRef,(snapshot) =>{
      let arr = []
      snapshot.forEach((item) =>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
      })
      setfriendList(arr)
    });
  },[])
  console.log(friendList);

  return (
    <div>
          <GroupCard cardtitle='Friend'>
    {friendList && friendList.length > 0 ?friendList.map((item,index)=>(
    <div key={index} className='usermainbox'>
        <div className="userItem">
            <div className="userimgBox">
                <img src={item.friendimg} alt="not found" />
            </div>
            <div className="userinfo">
                <div className="userName">
                <h4>{item.friendname}</h4>
                <p>Mern Developer</p>
                </div>
                <div className="btn">
                  <button>Block</button>
                </div>
            </div>
        </div>
    </div>
    ))
    :
    <h2>You have no any Friend</h2>
    }
    </GroupCard>
    </div>
  )
}

export default Friend