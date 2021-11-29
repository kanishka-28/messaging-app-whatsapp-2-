import React from 'react'
import Head from "next/head"
import whatsapp from "../assets/images/whatsappURL"
import { FcGoogle } from "react-icons/fc"
import { auth, provider } from '../firebase'
const Login = () => {

    const login = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    
    return (
        <>
            <Head>
                <title>login</title>
                <link rel="icon" href={whatsapp} />
            </Head>
            <div className="h-screen flex justify-center items-center bg-peach-100">
                <div className="flex flex-col py-2 border-2 border-gray-300 shadow-lg mx-auto w-full md:w-2/3 lg:w-1/4 h-2/3 inner-shadow bg-white">
                    <img src={whatsapp}
                        className=" w-28 h-28 self-center" />
                    <button className="bg-gray-200 hover:bg-gray-300 my-3 p-5 w-max self-center flex items-center" onClick={login}><FcGoogle className="w-6 h-6 mx-2" /><p>Login with google</p></button>
                </div>
            </div>
        </>
    )
}

export default Login