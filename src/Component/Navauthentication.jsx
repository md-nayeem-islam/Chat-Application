import React from 'react'
import { Link } from 'react-router-dom'

const Navauthentication = ({text, linkText, link, style}) => {
  return (
    <>
        <p className={style}>
            {text}
            <Link to={link}>{linkText}</Link>
        </p>
    </>
  )
}

export default Navauthentication