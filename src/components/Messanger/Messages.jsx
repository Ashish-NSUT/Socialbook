import React, {useState,useRef} from 'react'
import {format} from "timeago.js"
import DropdownMenu from './DropDown';


export default function Messages(props) {

  const {owner,message} = props;
  const [dropDown, setDropDown] = useState(false);
  const [position, setPosition] = useState(true);
  const dropdownRef = useRef(null);

  const options = (e)=> {
    const dropdownHeight = e.clientY;
    const windowHeight = window.innerHeight;

    // Adjust the position based on whether the dropdown should appear above or below
    setPosition(dropdownHeight > windowHeight/2 ? true : false);
    setDropDown(!dropDown);

  }

  return (
    <>
    <div className={`flex w-full flex-col gap-2 ${!owner ? "items-end" : "items-start" }`}>
      <div ref={dropdownRef} className={`p-4 px-6 rounded-full text-sm text-${owner ? "[#1c2e46]" : "white"} bg-${owner ? "white" : "[#1c2e46]"} max-w-[45%] shadow-md relative group/arrow`}>
          {message.message} 
          <span className="pr-2 pt-1 absolute top-0 invisible group-hover/arrow:visible cursor-pointer text-gray-500" onClick={(e)=>{options(e)}}>
            <i className="fa-solid fa-chevron-down"></i>
            </span>

            {dropDown && <DropdownMenu setDropDown={setDropDown} dropdownRef={dropdownRef} position={position} owner={owner} message={message}/>}
      </div>
      <div className="text-[11px] text-gray-400 mx-4">
          {format(message.createdAt)}
      </div>
    </div>

    
    </>
  )
}