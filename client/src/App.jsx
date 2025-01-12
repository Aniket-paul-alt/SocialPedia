import { Box, Button, Container } from "@chakra-ui/react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import PostPage from "./pages/PostPage"
import UserPage from "./pages/UserPage"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
// import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./components/CreatePost"
import ChatPage from "./pages/ChatPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  const user = useRecoilValue(userAtom)
  // console.log(user);
  const { pathname } = useLocation()
  
  return (
    <>
    <Box position={"relative"} w="full">
    <Container maxW={pathname === "/" ? {base:"620px" , md:"900px"} : "620px"}>
    <Header/>
      <Routes>
        <Route path="/" element={user ? <Homepage/> : <Navigate to="/auth"/>} />
        <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>} />
        <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/auth"/>} />

        <Route path="/:username" element={user ? (
          <>
            <UserPage/>
            <CreatePost/>
          </>
        ) : (<UserPage/>) } />
        <Route path="/:username/post/:pId" element={<PostPage/>} />
        <Route path="/chat" element={user ? <ChatPage/> : <Navigate to={"/auth"} />} />
        <Route path="/settings" element={user ? <SettingsPage/> : <Navigate to={"/auth"} />} />
      </Routes>

    </Container>
    </Box>
    </>
  )
}

export default App
