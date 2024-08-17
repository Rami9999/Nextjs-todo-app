import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const Nav = () => {
  return (
    <nav className='container flex items-center justify-between'>
      <ModeToggle/>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </nav>
  )
}

export default Nav