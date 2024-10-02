'use client'
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button 
      className="bg-cyan-500 px-3 py-1 m-5 rounded"
      onClick={() => signIn()}>Sign in</button>
    </>
  )
}