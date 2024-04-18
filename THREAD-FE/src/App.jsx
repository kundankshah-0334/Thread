import { Button } from "@chakra-ui/react"
import { Container } from '@chakra-ui/react'
import { Navigate , Route, Routes } from "react-router-dom"
// import PostPage from "../public/Pages/PostPage"
import PostPage from "./Pages/PostPage"
// import UserPage from "../public/Pages/UserPage"
import UserPage from "./Pages/UserPage"
import Header from "./Component/Header"
import Homepage from "./Pages/Homepage"
import AuthPage from "./Pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atom/userAtom"
import LogoutUser from "./Component/LogoutUser"
import UpdateProfile from "./Component/UpdateProfile"
import CreatePost from "./Component/CreatePost"

function App() {
const user= useRecoilValue(userAtom)
  return (
    <Container maxW='620px'>
    <Header/>
    {/* <logoutUser /> */}
    <Routes>
      <Route path="/:username" element={<UserPage />}></Route>
      <Route path="/:username/post/:pid" element={<PostPage />}></Route>
      <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />}></Route>
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" /> }></Route>
      <Route path="/update" element={user ? <UpdateProfile /> : <Navigate to="/" /> }></Route>
    </Routes>
      {/* <Button>Hello</Button> */}
      {user && <LogoutUser />}
      {user && <CreatePost />}
    </Container>
  )
}

export default App
