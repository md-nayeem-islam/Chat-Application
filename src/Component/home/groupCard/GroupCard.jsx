import React from 'react'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import './groupCard.css'

const GroupCard = ({children,cardtitle}) => {
  return (
    <>
      <div className="groupCard">
        <div className="groupHeading">
          <h3>{cardtitle}</h3>
          <div className="dots">
          <PiDotsThreeOutlineVerticalFill />
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default GroupCard