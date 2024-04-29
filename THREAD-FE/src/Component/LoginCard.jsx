import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atom/authAtom'
import { useToast } from '@chakra-ui/react'
import userAtom from '../atom/userAtom'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [inputs , setInput] = useState({
    username : "",
    password : ""
  })
  const handleLogin = async () => {
    setLoading(true)
    try {
      // console.log("login clicked")
      const res = await fetch("/api/users/login" , {
        method: "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })

      const data = await res.json();
      // console.log(data);

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

      localStorage.setItem("user-thread" , JSON.stringify(data))
      setUser(data);
    } catch (error) {
      // console.log({message : error.message});
    } finally{
      setLoading(false)
    }
  }
  return (
    <Flex mt={"-70px"} align={'center'} justify={'center'} >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
        >

          <Stack spacing={4}>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="email"  onChange={(e)=> setInput({...inputs , username: e.target.value})}
                    value={inputs.username} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}  onChange={(e)=> setInput({...inputs , password: e.target.value})}
                    value={inputs.password} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button loadingText="logging in" size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }} onClick={handleLogin}  isLoading={loading}>
               
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account? <Link color={'blue.400'}
                  onClick={() => setAuthScreen("signup")}
        
                >Sign up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}