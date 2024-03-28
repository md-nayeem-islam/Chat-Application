import React, { useEffect, useState } from "react";
import GroupCard from "../../Component/home/groupCard/GroupCard";
import "./userlist.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const [userList, setUserList] = useState();
  const db = getDatabase();
  const data = useSelector((state) => state.loginUserData.value);
  const [fRequest, setFRequest] = useState([]);

  const [friendList, setfriendList] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  useEffect(() => {
    const friendRef = ref(db, "Frieds");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().receiverid == data.uid ||
          item.val().senderid == data.uid
        ) {
          arr.push(item.val().receiverid + item.val().senderid);
        }
      });
      setfriendList(arr);
    });
  }, []);

  let handleRequest = (fRequestInfo) => {
    set(ref(db, "friendRequest/" + fRequestInfo.id), {
      senderid: data.uid,
      sendername: data.displayName,
      senderimg: data.photoURL,
      receiverid: fRequestInfo.id,
      receivername: fRequestInfo.username,
      receiverimg: fRequestInfo.profileImg,
    });
  };

  useEffect(() => {
    const fRequestRef = ref(db, "friendRequest");
    onValue(fRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().senderid) {
          arr.push(item.val().senderid + item.val().receiverid);
        }
      });
      setFRequest(arr);
    });
  }, []);

  let handleCencel = (item) => {
    remove(ref(db, "friendRequest/" + item.id));
    console.log(item.id);
  };

  return (
    <>
      <GroupCard cardtitle="User List">
        {userList && userList.length > 0 ? (
          userList.map((item, index) => (
            <div key={index} className="usermainbox">
              <div className="userItem">
                <div className="userimgBox">
                  <img src={item.profileImg} alt="not found" />
                </div>
                <div className="userinfo">
                  <div className="userName">
                    <h4>{item.username}</h4>
                    <p>Mern Developer</p>
                  </div>

                  {(fRequest.length > 0 &&
                    fRequest.includes(item.id + data.uid)) ||
                  fRequest.includes(data.uid + item.id) ? (
                    <div className="userbtn">
                      <button>Panding</button>
                      <button onClick={() => handleCencel(item)}>cancel</button>
                    </div>
                  ) : friendList.includes(item.id + data.uid) ||
                    friendList.includes(data.uid + item.id) ? (
                    <button className="userbtn">Friend</button>
                  ) : (
                    <div className="userbtn">
                      <button onClick={() => handleRequest(item)}>add</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>user not avilable</h2>
        )}
      </GroupCard>
    </>
  );
};

export default UserList;
