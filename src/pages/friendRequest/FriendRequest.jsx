import React, { useEffect, useState } from 'react'
import friendrequiest from '../../images/friendrequiest.jpg'
import GroupCard from '../../Component/home/groupCard/GroupCard'
import { getDatabase, ref, onValue, push, set, remove} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import '../friendRequest/friendRequest.css'

const FriendRequest = () => {

    const db = getDatabase();
    const data = useSelector((state) => state.loginUserData.value);
    const [fRequest, setFRequest] = useState ()

    useEffect(()=>{
        const fRequestRef = ref(db,'friendRequest');
        onValue(fRequestRef,(snapshot) =>{
          let arr = []
          snapshot.forEach((item) =>{
            if(data.uid == item.val().receiverid){
              arr.push({...item.val(),id:item.key})
            }
          })
          setFRequest(arr)
        });
      },[])

      const handleCancelFRequest = (cancelInfo) =>{
        console.log(cancelInfo);
        remove(ref(db, 'friendRequest/' + cancelInfo.id))
      }

      const handleAcceptFRequest =(acceptInfo) =>{
        set(push(ref(db,"Frieds")),{
          friendid : acceptInfo.senderid,
          friendname : acceptInfo.sendername,
          friendimg : acceptInfo.senderimg,
          receiverid : data.uid,
          receivername : data.displayName,
          receiverimg : data.photoURL,
        }).then(()=>{
          remove(ref(db, 'friendRequest/' + acceptInfo.id))
        })
      }

  return (
    <div>
            <GroupCard cardtitle='Friend Requiest'>
        {fRequest && fRequest.length > 0 ?
        fRequest.map((item,index)=>(
        <div key={index} className='usermainbox'>
            <div className="userItem">
                <div className="userimgBox">
                    <img src={item.senderimg} alt="not found" />
                </div>
                <div className="userinfo">
                    <div className="userName">
                    <h4>{item.sendername}</h4>
                    <p>Mern Developer</p>
                    </div>
                    <div className="fRequestBTN">
                    <button onClick={() => handleAcceptFRequest(item)}>Accept</button>
                    <button onClick={() => handleCancelFRequest(item)} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    :
    <h2>Friend not available</h2>
    }
        </GroupCard>
    </div>
  )
}

export default FriendRequest