import {  Flex,  Box,  FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack,  Button,  Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import authScreenAtom from '../atom/authAtom'
import userAtom from '../atom/userAtom'
import {  useSetRecoilState  } from 'recoil'
import { useToast } from '@chakra-ui/react'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const setUser = useSetRecoilState(userAtom)

  const [inputs , setInput] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
  })
  // const handleSubmit = async () => {
  //   try {
  //     console.log(inputs)
  //     const res = await fetch("/api/users/signup" ,{
  //       method :"POST",
  //       headers:{
  //         "Content-Type" : "application/json",
  //       },
  //       body:JSON.stringify(inputs),
  //     });

  //     const data =  res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      console.log(inputs);  
      const res = await fetch("/api/users/signup", {   
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(inputs),  
      });
  
      const data = await res.json();  
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
      localStorage.setItem("user-thread",JSON.stringify(data));
      setUser(data)
      // localStorage.setItem("user-thread",JSON.stringify(data));
      console.log(data); // Logs the parsed JSON data to the console
    } catch (error) {
      console.log(error); // Logs any errors that occur during the process
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
    <Flex mt={"-70px"} align={'center'} justify={'center'} >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl   isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input type="text" 
                    onChange={(e)=> setInput({...inputs , name: e.target.value})}
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text"
                   onChange={(e)=> setInput({...inputs , username: e.target.value})}
                    value={inputs.username}
                     />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
               onChange={(e)=> setInput({...inputs , email: e.target.value})}
                    value={inputs.email}
               />
            </FormControl>
            <FormControl  isRequired>
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
              <Button loadingText="Submitting"  size="lg"
                bg={useColorModeValue("gray.600" , "gray.700")}
                color={'white'}
                _hover={{
                  bg:  useColorModeValue("gray.700" , "gray.800"),
                }} onClick={handleSubmit}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={()=> setAuthScreen("login")} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}