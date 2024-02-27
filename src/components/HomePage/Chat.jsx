import React from 'react'
import { Link,useLocation } from 'react-router-dom'

export default function Chat(props) {
  let location = useLocation();


  return (
    <div className={`fixed bottom-10 right-10 border shadow-xl px-6 py-6 rounded-[200px] text-3xl bg-white cursor-pointer ${location.pathname === '/login' || location.pathname  === '/chatting' || location.pathname === '/signup' ? "hidden" : ""}`}>
        <Link to="/chatting"> <i className="fa-solid fa-comments"></i> </Link>
        </div>
  )
}
