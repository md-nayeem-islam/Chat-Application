import React, { useEffect, useState } from 'react'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import { FaPlus } from 'react-icons/fa'
import './userlist.css'
import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { useSelector} from 'react-redux';


const UserList = () => {
  const [userList, setUserList] = useState();
  const db = getDatabase();
  const data = useSelector((state) => state.loginUserData.value);
  const [fRequest, setFRequest] = useState ([])

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


  let handleRequest = (fRequestInfo) =>{
    set(push(ref(db,"friendRequest")),{
      senderid : data.uid,
      sendername : data.displayName,
      senderimg : data.photoURL,
      receiverid : fRequestInfo.id,
      receivername : fRequestInfo.username,
      receiverimg : fRequestInfo.profileImg,
    })
  }

  useEffect(()=>{
    const fRequestRef = ref(db,'friendRequest');
    onValue(fRequestRef,(snapshot) =>{
      let arr = []
      snapshot.forEach((item) =>{
        if(data.uid == item.val().senderid){
          arr.push(item.val().senderid + item.val().receiverid)
        }
      })
      setFRequest(arr)
    });
  },[])

  console.log(fRequest);

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

                    {fRequest && fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                    ?
                    <div className="userbtn">
                    <button onClick={() => handleRequest(item)} >cancel</button>
                  </div>
                    :
                    <div className="userbtn">
                    <button onClick={() => handleRequest(item)} >add</button>
                  </div>
                    }
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