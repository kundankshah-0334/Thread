import { Box, Button } from "@chakra-ui/react"
import { Container } from '@chakra-ui/react'
import { Navigate , Route, Routes, useLocation } from "react-router-dom"
// import PostPage from "../public/Pages/PostPage"
import PostPage from "./Pages/PostPage"
// import UserPage from "../public/Pages/UserPage"
import UserPage from "./Pages/UserPage"
import Header from "./Component/Header"
import Homepage from "./Pages/Homepage"
import AuthPage from "./Pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atom/userAtom"
import UpdateProfile from "./Component/UpdateProfile"
import CreatePost from "./Component/CreatePost"
import ChatPage from "./Pages/ChatPage"
import SettingsPage from "./Pages/SettingsPage"

function App() {
  const { pathname } = useLocation();
const user= useRecoilValue(userAtom)
  return (
    <Box position={"relative"} w={"full"}>

    
    <Container maxW={ pathname == "/" ? {base : " 620px" , md : "900px"} : "620px"}>
    <Header/>
    {/* <logoutUser /> */}
    <Routes>
      <Route
       path="/:username"
        element={
          user ? (
            <>
            <UserPage />
            <CreatePost />
            </>
          ) : 
          (
            <UserPage />
          )
        }>

       </Route>
      <Route path="/:username/post/:pid" element={<PostPage />}></Route>
      <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />}></Route>
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" /> }></Route>
      <Route path="/update" element={user ? <UpdateProfile /> : <Navigate to="/" /> }></Route>
      <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" /> }></Route>
      <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" /> }></Route>
    </Routes>
      {/* <Button>Hello</Button> */}

      
    </Container>
    </Box>
  )
}

export default App
