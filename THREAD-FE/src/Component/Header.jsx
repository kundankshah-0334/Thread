import { Flex,Image , Link, useColorMode } from "@chakra-ui/react"
import {useRecoilValue} from "recoil"
import userAtom from "../atom/userAtom";
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import {Link as RouterLink} from "react-router-dom"

const Header = () => {
  const user = useRecoilValue(userAtom)
    const {colorMode , toggleColorMode} = useColorMode();
  return ( 
    <div>
      <Flex justifyContent={"space-between"} mt={6} mb='12'>
      {  user && (
          <Link as={RouterLink} to="/">
            <AiFillHome fontSize={24}/>
          </Link>
        )}
        <Image 
            cursor= {"pointer"}
            alt = "logo"
            w={6}
            src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
            onClick= {toggleColorMode}
        />
          {  user && (
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar fontSize={24}/>
          </Link>
        )}

      </Flex>
    </div>
  )
}

export default Header
