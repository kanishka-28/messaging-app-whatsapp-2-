import firebase from "firebase";
import React, { useRef, useState} from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { HiUserCircle, HiOutlineDotsVertical } from 'react-icons/hi'
import { ImAttachment,ImMic, ImPointLeft } from 'react-icons/im'
import { CgSmileMouthOpen } from 'react-icons/cg'
import { auth, db } from '../firebase'
import Message from './Message'
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/chats";
import { useRouter } from "next/dist/client/router";
const ChatScreen = ({ messages, chat , screen}) => {

    const [user] = useAuthState(auth);
    const [input, setinput] = useState('')
    const router = useRouter()
    const [messageSnapShot] = useCollection(
        //go to collection chats of db then doc to a particular chat then go to collection messages
        db.collection('chats').doc(chat.id).collection('messages').orderBy('timestamp', 'asc')
    )

    const [recipientSnapShot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(user, chat.users)[0]))
    const photo = recipientSnapShot?.docs?.[0]?.data()?.photo;
    const recipient = recipientSnapShot?.docs?.[0]?.data()

    const endOfMessagesRef = useRef(null)

    const scrollToBottom=()=>{
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    const sendMessage=(e)=>{
        document.getElementById( 'bottom' ).scrollIntoView();
        e.preventDefault();    
        if(input===''){
            return null
        }
            //update the last seen
        db.collection('users').doc(user.uid).set(
            {
                lastseen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {merge: true}
        )
        db.collection('chats').doc(chat.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messages: input,
            user: user.email,
            photoUrl: user.photoURL,
        })
        setinput('')
        scrollToBottom();
    }

    const ShowMessages=()=>{
        if(messageSnapShot){
            return messageSnapShot.docs.map((message)=>(
                <Message key={message.id} userName={message.data().user} message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime()
                }}/>
            ))
        }else{
            return null
        }
    }
    return (
        <div className="flex flex-col justify-between bg-pink-100 h- lg:w-3/4 md:w-2/3 w-full" id="bottom" style={{ backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/b/b1/Little_background.jpg")` }}>
            <nav className="sticky top-0 bg-white p-3 px-6 flex justify-between items-center">
                {screen==="mobile" && <ImPointLeft className="w-6 h-5 mr-2 cursor-pointer" onClick={()=>router.push("/")}/>}
                <div className="flex gap-4 items-center">
                    {photo?<img src={photo} alt="profile" className="w-10 h-10 rounded-full" />:<HiUserCircle className="w-10 h-10 cursor-pointer hover:opacity-80" />}
                    <div>
                        <p className="font-bold text-l">{getRecipientEmail(user, chat.users)}</p>
                        <p className="text-gray-600 text-xs">Last Seen : {recipient?recipient.lastseen.seconds:'unavailable'}</p>
                    </div>
                </div>
                <div className="flex gap-5 justify-evenly items-center">
                    <ImAttachment className="w-5 h-5 cursor-pointer" />
                    <HiOutlineDotsVertical className="w-5 h-5 mx-2 cursor-pointer" />
                </div>
            </nav>
            <div className="bg-red-"><ShowMessages/></div>
            <div className="" ref={endOfMessagesRef}></div>
            <footer className="sticky bottom-0 bg-gray-300 p-3 px-10 flex justify-between z-30">
            <form className="flex gap-5 items-center w-full">
                <CgSmileMouthOpen className="w-6 h-6"/>
                <input value={input} className="md:w-full w-3/4 p-4 rounded-md" onChange={(e)=>setinput(e.target.value)}/>
                <ImMic className="w-6 h-6 rounded-full text-"/>
                <button type="submit" className="bg-green-500 font-bold px-2 py-1 rounded-md" onClick={sendMessage} >Send</button>
            </form>
            </footer>
        </div>
    )
}

export default ChatScreen
