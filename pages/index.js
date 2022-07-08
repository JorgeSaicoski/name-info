import Head from 'next/head'
import Image from 'next/image'
import Initial from ".//Components/Initial"

export default function Home() {
  return (
    <div className="text-3xl font-bold bg-yellow-700 w-screen">
      <Head>
        <title>Name Info!</title>
        <meta name="description" content="Info about your name!" />
      </Head>

      <div className="w-full">
        <Initial/>
      </div>
    </div>
  )
}
