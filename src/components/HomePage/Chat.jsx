import React from 'react'
import { Link,useLocation } from 'react-router-dom'

export default function Chat(props) {
  let location = useLocation();


  return (
    <div className={`fixed bottom-5 right-5 sm:bottom-10 sm:right-10 border shadow-xl px-4 py-3 sm:px-6 sm:py-6 rounded-[200px] text-2xl sm:text-3xl bg-white cursor-pointer ${location.pathname === '/login' || location.pathname  === '/chatting' || location.pathname === '/signup' ? "hidden" : ""}`}>
        <Link to="/chatting"> <i className="fa-solid fa-comments"></i> </Link>
        </div>
  )
}
