import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatScreen from '../../components/ChatScreen'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../firebase'
import Head from 'next/dist/shared/lib/head'
import whatsapp from '../../assets/images/whatsappURL'
const Chat = ({messages, chat}) => {
    
    const [user] = useAuthState(auth);

    return (
        <>
        <Head>
            <title>{chat.users[1]}</title>
            <link rel="icon" href={whatsapp}/>
        </Head>
        <div className="flex md:hidden">
            <ChatScreen messages={messages} chat={chat} screen="mobile"/>
        </div>
        <div className="hidden md:flex">
            <Sidebar/>
            <ChatScreen messages={messages} chat={chat} screen="laptop"/>
        </div>
        </>
    )
}

export default Chat

export async function getServerSideProps(context){
    //doubt-1 .doc smjh nhi aaya
    const ref = db.collection('chats').doc(context.query.id)

    //prep the messages on the server
    const messageRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messageRes.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    //Prep the chat
    const chatRes = await ref.get();
    const chat = { 
        id: chatRes.id,
        ...chatRes.data(),
    }
    
    return {
        props:{
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}