import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { HiUserCircle } from "react-icons/hi"
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/chats'

const Chat = ({ id, users }) => {

    const router = useRouter();
    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    const [user] = useAuthState(auth);
    const email = getRecipientEmail(user, users)
    const [recipientSnapShot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(user, users)[0]))
    const photo = recipientSnapShot?.docs?.[0]?.data()?.photo;
    const name = recipientSnapShot?.docs?.[0]?.data()?.name;
    // console.log(recipientSnapShot?.docs?.[0]?.data()?.name);
    
    return (
        <div className="px-5 flex justify items-center border border-gray-300 py-2 cursor-pointer hover:bg-gray-200" onClick={enterChat}>
            
            <div>
            {photo?<img src={photo} alt="profile" className="w-10 h-10 rounded-full ml-1" />:
            <div className="rounded-full bg-pink-200 w-10 h-10 items-center flex justify-center font-semibold">{email[0]?.slice(0,2).toUpperCase()}</div>}
            </div>
            <p className="mx-3">{name?name:email}</p>
        </div>
    )
}

export default Chat
