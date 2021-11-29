import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiUserCircle } from "react-icons/hi"
import { auth } from '../firebase'
import getRecipientEmail from '../utils/chats'

const Chat = ({ id, users }) => {

    const router = useRouter();
    const enterChat=()=>{
        router.push(`/chat/${id}`)
    }
    const [user] = useAuthState(auth);
    const name = getRecipientEmail(user, users)
    
    return (
        <div className="px-5 flex justify items-center border border-gray-300 py-2 cursor-pointer hover:bg-gray-200" onClick={enterChat}><div>
                {/* <img src="" alt="profile" className="rounded-full w-10 h-10 cursor-pointer" /> */}
            </div><div><HiUserCircle className="w-10 h-10 cursor-pointer hover:opacity-80" /></div>
            <p className="mx-3">{name}</p>
        </div>
    )
}

export default Chat
