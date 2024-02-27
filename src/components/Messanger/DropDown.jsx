import React, { useContext, useEffect } from 'react';
import messageContext from '../../context/messageContext';


const DropdownMenu = (props) => {

  const context = useContext(messageContext);
  const {setDeletePrompt} = context;


    const {setDropDown,dropdownRef,position, owner,message} = props;
  useEffect(() => {
    const handleMousedown = (e) => {
        console.log(dropdownRef.current?.contains(e.target));
      if(!dropdownRef.current?.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener('click', handleMousedown);

    return () => {
      document.removeEventListener('click', handleMousedown);
    };
  });

  

  return (

      <>
        <div className={`absolute border z-[1000] ${position ? "top-[-190px]" : "top-0"} ${owner ? "right-[-180px]" : "left-[-180px]"} bg-[#1c2e46] w-[180px] rounded-md py-3 text-gray-300`}>
          {/* Dropdown content */}
          <p className='cursor-pointer hover:bg-[#32465e] px-6 py-3'>More Info</p>
          <p className='cursor-pointer hover:bg-[#32465e] px-6 py-3' onClick={() => {setDeletePrompt(message._id)}}>Delete</p>
          <p className='cursor-pointer hover:bg-[#32465e] px-6 py-3'>Forward</p>
          <p className='cursor-pointer hover:bg-[#32465e] px-6 py-3'>Edit</p>
          <p className='cursor-pointer hover:bg-[#32465e] px-6 py-3'>React</p>
        </div>

      </>
  );
};

export default DropdownMenu;
