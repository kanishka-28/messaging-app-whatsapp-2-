import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Message = ({ userName, message }) => {
    const [user] = useAuthState(auth);
    console.log(user, userName);
    return (
        <>
            {userName === user.email ?
                <div className="w-full flex justify-end">
                    <div className="object-right w-max bg-yellowgreen-200 rounded-md p-2 flex items-center m-2">
                        {message.messages}
                    </div>
                </div> :
                <div className="w-full flex justify-start">
                    <div className="w-max bg-white rounded-md p-2 m-2 flex items-center">
                        {message.messages}
                    </div>
                </div>}
        </>
    )
}

export default Message
