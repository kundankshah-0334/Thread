import React, { useEffect } from 'react'
import { Avatar, Box, Button, Divider, Flex,Spinner, Image, Text, useShortcut } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"
import Actions from '../Component/Actions'
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from "react"
import Comment from '../Component/Comment'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilValue } from 'recoil'
import userAtom from '../atom/userAtom'
import { DeleteIcon } from '@chakra-ui/icons'

const PostPage = () => {

  const currentUser= useRecoilValue(userAtom)
  const  { user , loading } = useGetUserProfile()
  const {pid} = useParams();
  const showToast = useShowToast();
  const [post , setPost] = useState(null);
  const navigate = useNavigate();
  console.log(currentUser._id);
  // console.log(user._id);

 
   useEffect(()=>{
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if(data.error){
          return showToast("error" , data.error , "error")
        }
        console.log(data)
        setPost(data);
        
      } catch (error) {
        showToast("Error" , error.message , "error")
      }
    }
    getPost();

   } , [showToast , pid])


   const handleDeletePost = async (e) => {
		try {
			e.preventDefault();
			if(!window.confirm("Are you sure to[ delete this post ?")) return ;

			const res = await fetch(`/api/posts/${post._id}` , {
				method: "DELETE"
			})
			showToast("Success" , "Post Deleted Successfully" , "success")
      navigate(`/${user.username}`);
			const data = res.json();
			if(data.error){
				showToast("Error" , data.error , "error")
			}

			
		} catch (error) {
			showToast("Error" , error.message , "error");

		}
	}	

   if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
      <Spinner size="xl" />
    </Flex>
    )
   }

   if(!post) return null ;



  return (

    <Flex gap={3} py={5} mb={4}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar size={"md"} name="mark-zukarbarg" src={user?.profilePic} />
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"} >
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"} >{user?.username}</Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>

          {/* <Flex gap={4} alignItems={"center"}>
            <Text fontStyle={"sm"} color={"gray.light"} >1d</Text>
            <Menu>
              <MenuButton>
                <BsThreeDots ></BsThreeDots>
              </MenuButton>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} >Copy Thread Link</MenuItem>
              </MenuList>
            </Menu>
          </Flex> */}
          <Flex gap={4} alignItems={"center"}>
						  <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
							</Text>

							  {/* <DeleteIcon size={20}  />  */}
							{currentUser._id === user._id && <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />}  
						</Flex>
        </Flex>

        <Text fontSize={"sm"}>{post.text}</Text>

{
  post.img && (
    <Box borderRadius={5} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Link to={"markzukarbarg/post/1"}> <Image src={post.img}></Image>    </Link>
        </Box>
  )
}


       

        <Flex gap={3} my={1}>
          <Actions post={post} />
        </Flex>

        {/* <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
          <Box mt={1} w={.5} h={.5} borderRadius={"full"} bg={"gray.light"} ></Box>
          <Text color={"gray.light"} fontSize={"sm"} >{post.likes.length} likes</Text>
        </Flex> */}
        
        <Divider my={4} />
        <Flex justifyContent={"space-between"} >
          <Flex gap={2} alignItems={"center"} >
            <Text fontSize={"2xl"} >👋</Text>
            <Text color={"gray.light"} >Get the app to like, reply and Post</Text>
          </Flex>
          <Button>Get</Button>
        </Flex>
        <Divider my={2} />

        { post.replies.map(reply => (
          <Comment
           key={reply._id}
            reply={reply} 
            lastReply={reply._id === post.replies[post.replies.length -1 ]._id} />
          )) }
        {/* <Comment likes={423} comment="This man is hero for us." name='Kola Tioluwani' src='https://bit.ly/ryan-florence'/>
        <Comment likes={117} comment= "Nice Guy." name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
        <Comment likes={49} comment="Amazing guy." name='Ryan Florence' src='https://bit.ly/sage-adebayo' />
        <Comment likes={1943} comment="A man with zero Haters." name='Segun Adebayo' src='https://bit.ly/dan-abramov' /> */}
      </Flex>
    </Flex>
  )

}

export default PostPage




