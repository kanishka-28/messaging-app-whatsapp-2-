import React from 'react'
import { HiUserCircle, HiOutlineDotsVertical, HiOutlineSearch } from "react-icons/hi"
import { BsChatLeftText } from "react-icons/bs"
import { Scrollbars } from 'react-custom-scrollbars';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from "react-firebase-hooks/firestore"
import EmailValidator from "email-validator"
import Chat from './Chat';
const Sidebar = () => {

    const [user] = useAuthState(auth)
    //database ke collections me se loggedIn user ki chats ka reference lerhe h
    const userChatRef = user && db.collection("chats").where("users", "array-contains", user.email);
    const [chatSnapShot] = useCollection(userChatRef)
    
    const searchHandle = (e) => {
    }

    const createChat = (e) => {
        const name = prompt("plz enter an email to chat with")
        if (!name) { return null }
        if (EmailValidator.validate(name) && !chatAlreadyExists(name) && name !== user.email) {
            db.collection('chats').add({
                users: [user.email, name]
            })
        } else {
            alert("invalid email")
        }
    }

    const chatAlreadyExists = (recipientEmail) => {
        return chatSnapShot?.docs.find(chat =>
            chat.data().users.find(user => user === recipientEmail))
    }

    return (
        <div className="h-screen lg:w-1/4 md:w-1/3 w-full sticky top-0">
            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}>
                <div className="sticky top-0 z-30 bg-white">
                    <div className="flex justify-between items-center h-16 px-5">
                        {(user) ? <div>
                            <img src={user.photoURL} alt="profile" className="rounded-full w-10 h-10 cursor-pointer" onClick={() => {
                                auth.signOut();
                            }} />
                        </div> : <div><HiUserCircle onClick={() => {
                            auth.signOut();
                        }} className="w-10 h-10 cursor-pointer hover:opacity-80" /></div>}
                        <div className="flex justify-evenly items-center">
                            <BsChatLeftText className="w-5 h-5 cursor-pointer" />
                            <HiOutlineDotsVertical className="w-5 h-5 mx-2 cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center shadow h-12 justify-center py-2">
                        <HiOutlineSearch className="mr-5 text-gray-400" />
                        <input placeholder="Search Chat" className="focus:outline-none" onChange={searchHandle} />
                    </div>
                    <button className="text-2xl text-center w-full hover:bg-gray-200 py-2 my-1" onClick={createChat}>Start a new chat</button>
                </div>
                <div className="my-2">
                    {chatSnapShot?.docs.map((chat) => (
                        <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                    ))}
                    
                </div>
            </Scrollbars>
        </div>
    )
}

export default Sidebar