import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atom/userAtom";
import { AiFillHome } from "react-icons/ai"
import { BsFillChatQuoteFill } from "react-icons/bs"
import { RxAvatar } from "react-icons/rx"
import { Link as RouterLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import useLogout from "../hooks/useLogout"
import authScreenAtom from "../atom/authAtom";
const Header = () => {
  const logout = useLogout()
  const user = useRecoilValue(userAtom)
  const setAuthScreen = useRecoilState(authScreenAtom)
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justifyContent={"space-between"} mt={6} mb='12'>
        {user && (
          <Link as={RouterLink} to="/">
            <AiFillHome fontSize={24} />
          </Link>
        )}

        {!user && (
          <Link as={RouterLink} onClick={
            () => setAuthScreen('login')
          }>

          </Link>
        )}
        <Image
          cursor={"pointer"}
          alt="logo"
          w={6}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          onClick={toggleColorMode}
        />
        {user && (
          <Flex alignItems={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar fontSize={24} />
            </Link>
            <Link as={RouterLink} to={"settings"}>
              <MdOutlineSettings fontSize={24} />
            </Link>
            <Link as={RouterLink} to={`/chat`}>
              <BsFillChatQuoteFill size={20} />
            </Link>

            <Button size={"xs"} onClick={logout} >
              <FiLogOut />
            </Button>

          </Flex>
        )}

        {!user && (
          <Link as={RouterLink} onClick={
            () => setAuthScreen('signup')
          }>

          </Link>
        )}


      </Flex>
    </div>
  )
}

export default Header
