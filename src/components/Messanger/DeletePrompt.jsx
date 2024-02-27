import React,{useContext, useRef} from 'react'
import messageContext from '../../context/messageContext';


export default function DeletePrompt() {
  const context = useContext(messageContext);

  const {deletePrompt,setDeletePrompt, deleteMessage} = context;
  const prompt = useRef(null);


  const handleDelete = async () => {
    await deleteMessage(deletePrompt);
    setDeletePrompt(null);
  }

    return (
        <div ref={prompt} className={`h-[100vh] w-[100vw] absolute top-0 flex justify-center items-center ${deletePrompt ? "" : "hidden"}`}>
            <div className='h-[100vh] w-[100vw] absolute top-0 bg-black opacity-50 z-0' onClick={()=>{setDeletePrompt(null);}}>
            </div>

            <div className='h-[30vh] w-[27vw] bg-[#1c2e46] text-white p-10 flex flex-col justify-between z-[10]'>
                <div className='px-2'>Delete Message</div>
                <div className='flex justify-between'>
                    <button className='hover:bg-[#32465e] p-4 rounded-full' onClick={()=>setDeletePrompt(null)}>cancel</button>
                    <button className='hover:bg-[#32465e] p-4 rounded-full bg-slate-600' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
