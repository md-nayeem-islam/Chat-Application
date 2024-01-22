import React from 'react'
import './home.css'
import UserList from '../userList/UserList';
import Friend from '../friend/Friend';
import GroupList from '../group/GroupList';
import FriendRequest from '../friendRequest/FriendRequest';
import MyGroup from '../myGroup/MyGroup';
import BlockUser from '../blockuser/BlockUser';

const Home = () => {
  return (
    <div className='homeWrapper'>
      <UserList/>
      <Friend/>
      <GroupList/>
      <FriendRequest/>
      <MyGroup/>
      <BlockUser/>
    </div>
  )
}

export default Home