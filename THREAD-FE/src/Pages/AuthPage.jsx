import React from 'react'
import SignupCard from '../Component/SignupCard'
import LoginCard from '../Component/LoginCard'
import authScreenAtom from '../atom/authAtom'
import { useRecoilValue } from 'recoil'
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  // console.log(authScreenState)
  return (
    <>
      { authScreenState === "login" ? <LoginCard /> : <SignupCard />}
    </>
  )
}

export default AuthPage
