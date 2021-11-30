import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import whatsapp from "../assets/images/whatsappURL"
export default function Home() {
  let open = localStorage.getItem("open")
  return (
    <>
      <Head>
        <title>WhatsApp 2.0</title>
        <link rel="icon" href={whatsapp} />
      </Head>
      <div className=" h-screen flex">
        <Sidebar/>
      </div>
    </>
  )
}