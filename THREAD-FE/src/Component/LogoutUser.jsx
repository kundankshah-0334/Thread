import React from 'react'
import {Button} from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atom/userAtom'
import { useToast } from '@chakra-ui/react'
import { FiLogOut } from "react-icons/fi"
import useShowToast from '../hooks/useShowToast'

const LogoutUser = () => {
  const toast = useToast();
    const setUser = useSetRecoilState(userAtom);

    const showToast = useShowToast();
    const handleLogout = async () => {
        
        try {
            const res = await fetch("/api/users/logout", {   
                method: "POST",
                headers: {
                  "Content-Type": "application/json",  
                }
              });

              const data = await res.json();  
              console.log(data)
      if(data.error){
        toast({
          title:"Error",
          description:data.error,
          status:"error", 
          duration:2000,
          isClosable:true,
        })
        return;
        }
        localStorage.removeItem("user-thread");
        setUser(null)
      }
      
     
      catch (error) {
            console.log(error)
            res.status(500).json({error : error})
            toast({
              title:"Error",
              description:data.error,
              status:"error", 
              duration:2000,
              isClosable:true,
            })
        }
    }

  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
      <FiLogOut/>
    </Button>
  )
}

export default LogoutUser
