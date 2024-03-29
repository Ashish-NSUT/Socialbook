import React, { useEffect, useState } from 'react'

export default function Typing(props) {

    const {socket, input, senderId, recipientId} = props;
    const [isTyping, setIsTyping] = useState(false);

    
    useEffect(()=>{
        const emitTyping = () =>{
            let timer = undefined;
            console.log(recipientId._id);
    
            if(!isTyping) {
                socket.current.emit('typing', {recipientId: recipientId._id, Typing: true, senderId: senderId});
            }
    
            clearTimeout(timer);
    
            timer = setTimeout(() => {
                socket.current.emit('typing', {recipientId: recipientId._id, Typing: false, senderId: senderId});
            },2000);
        }
        const inputRef = input.current;
        inputRef.addEventListener("input", emitTyping)

        return ()=>{
            inputRef.removeEventListener("input", emitTyping)
        }

    }, [recipientId])

    useEffect(()=>{
        const handleTyping = data =>{
            console.log(data)
            console.log("sender",senderId)
            console.log("reciever",recipientId._id)
            if(senderId === data.recipientId && recipientId._id === data.senderId) {
                setIsTyping(data.Typing);
            }
        }

        const socketRef = socket.current;
        socketRef.on("typing", handleTyping);

        return () =>{
            socketRef.off("typing", handleTyping)
        }

    }, [recipientId])

    return (
        <>
            {
                isTyping && (
                    <div className="flex justify-center absolute bottom-16 left-[45%]">
                        <div className="animate-bounce w-fit border-[1px] border-[#1c2e46] rounded-3xl p-2">
                            Typing...
                        </div>
                    </div>
                )
            }

        </>
    )
}
