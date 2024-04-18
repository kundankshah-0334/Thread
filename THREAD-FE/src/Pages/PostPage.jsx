import React from 'react'
import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from '../Component/Actions'
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from "react"
import Comment from '../Component/Comment'

const PostPage = () => {

  const postImg = "/post1.png"
  const toast = useToast()
  const [liked, setLiked] = useState(false)
  const copyThreadLink = () => {
    const currentLocation = "markzukarbarg/post/1";
    navigator.clipboard.writeText(currentLocation).then(() => {
        toast({
            description: "URl Copied to Clipboard.",
            status: 'success',
            duration: 1000,
            isClosable: true,
        })
    })
}


  return (

    <Flex gap={3} py={5} mb={4}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar size={"md"} name="mark-zukarbarg" src="/zuck-avatar.png" />
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"} >
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"} >markzukarbarg</Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>

          <Flex gap={4} alignItems={"center"}>
            <Text fontStyle={"sm"} color={"gray.light"} >1d</Text>
            <Menu>
              <MenuButton>
                <BsThreeDots ></BsThreeDots>
              </MenuButton>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyThreadLink}>Copy Thread Link</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Text fontSize={"sm"}>{"postTitle"}</Text>
        <Box borderRadius={5} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Link to={"markzukarbarg/post/1"}> <Image src={postImg}></Image>    </Link>
        </Box>
        <Flex gap={3} my={1}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>{44} replies</Text>
          <Box mt={1} w={.5} h={.5} borderRadius={"full"} bg={"gray.light"} ></Box>
          <Text color={"gray.light"} fontSize={"sm"} >{56 + (liked ? 1 : 0)} likes</Text>
        </Flex>
        <Divider my={4} />
        <Flex justifyContent={"space-between"} >
          <Flex gap={2} alignItems={"center"} >
            <Text fontSize={"2xl"} >👋</Text>
            <Text color={"gray.light"} >Get the app to like, reply and Post</Text>
          </Flex>
          <Button>Get</Button>
        </Flex>
        <Divider my={2} />
        <Comment likes={423} comment="This man is hero for us." name='Kola Tioluwani' src='https://bit.ly/ryan-florence'/>
        <Comment likes={117} comment= "Nice Guy." name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
        <Comment likes={49} comment="Amazing guy." name='Ryan Florence' src='https://bit.ly/sage-adebayo' />
        <Comment likes={1943} comment="A man with zero Haters." name='Segun Adebayo' src='https://bit.ly/dan-abramov' />
      </Flex>
    </Flex>
  )

}

export default PostPage
