import React, {useState,useRef} from 'react'
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

  const d = new Date(message.createdAt);

  return (
    <>
    <div className={`flex w-full flex-col gap-2 ${!owner ? "items-end" : "items-start" }`}>
      <div ref={dropdownRef} className={`p-4 px-6 rounded-2xl text-sm text-${owner ? "[#1c2e46]" : "white"} bg-${owner ? "white" : "[#1c2e46]"} max-w-[80%] md:max-w-[45%] shadow-md relative group/arrow`}>
          {message.message} 
          <span className="pr-2 pt-1 absolute top-0 right-0 invisible group-hover/arrow:visible cursor-pointer text-gray-500" onClick={(e)=>{options(e)}}>
            <i className="fa-solid fa-chevron-down"></i>
            </span>

           <DropdownMenu setDropDown={setDropDown} dropDown={dropDown} dropdownRef={dropdownRef} position={position} owner={owner} message={message}/>
      </div>
      <div className="text-[11px] text-gray-400 mx-4">
          {`${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`}
      </div>
    </div>

    
    </>
  )
}