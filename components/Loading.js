import React from 'react'
import spinner from "../assets/images/spinner"
import whatsapp from '../assets/images/whatsappURL'

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <img src={whatsapp} className="w-16 h-16 "/>
            <img src={spinner}/>
        </div>
    )
}

export default Loading
