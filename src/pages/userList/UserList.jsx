import React, { useEffect, useState } from 'react'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import user from '../../images/user.jpg'
import { FaPlus } from 'react-icons/fa'
import './userlist.css'
import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';


const UserList = () => {
  const [userList, setUserList] = useState();
  const db = getDatabase();
  const data = useSelector((state) => state.loginUserData.value);

  useEffect(()=>{
    const userRef = ref(db,'users');
    onValue(userRef,(snapshot) =>{
      let arr = []
      snapshot.forEach((item) =>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
      })
      setUserList(arr)
    });
  },[])

  // console.log(userList );

  let handleRequest = (fRequestInfo) =>{
    console.log(fRequestInfo);
    set(push(ref(db,"friendRequest")),{
      senderid : data.uid,
      sendername : data.username,
      senderimg : data.photoURL,
      receiverid : fRequestInfo.id,
      receivername : fRequestInfo.username,
      receiverimg : fRequestInfo.profileImg,
    })
  }


  return (
    <>
    <GroupCard cardtitle='User List'>
    { userList && userList.length > 0
    ?
    userList.map((item,index)=>(
      <div key={index} className='usermainbox'>
          <div className="userItem">
              <div className="userimgBox">
                  <img src={item.profileImg
  } alt="not found" />
              </div>
              <div className="userinfo">
                  <div className="userName">
                  <h4>{item.username}</h4>
                  <p>Mern Developer</p>
                  </div>
                  <div className="userbtn">
                  <button onClick={() => handleRequest(item)} ><FaPlus /></button>
                  </div>
              </div>
          </div>
      </div>
      ))
    :
    <h2>user not avilable</h2>
    }
    </GroupCard>
    </>
  )
}

export default UserList