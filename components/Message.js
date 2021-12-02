import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Message = ({ userName, message }) => {
    
    const [user] = useAuthState(auth);
    return (
        <>
            {userName === user.email ?
                <div className="w-full flex justify-end">
                    <div className="w-max max-w-xs break-words bg-yellowgreen-200 rounded-md p-2 flex flex-col m-2">
                        <p>{message.messages}</p><p className="font-semibold text-gray-500 self-end" style={{fontSize: "10px"}}>{message.timestamp?moment(message.timestamp).format("LT") : "..."}</p>
                    </div>
                </div> :
                <div className="w-full flex justify-start">
                    <div className="w-max max-w-xs break-words bg-white rounded-md p-2 m-2 flex flex-col">
                    <p>{message.messages}</p><p className="text-gray-400 font-semibold self-end" style={{fontSize: "10px"}}>{message.timestamp?moment(message.timestamp).format("LT") : "..."}</p>
                    </div>
                </div>}
        </>
    )
}

export default Message
