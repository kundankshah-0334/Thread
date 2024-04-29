import { useEffect, useState } from "react"
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import useShowToast from "../hooks/useShowToast";
const Comment = ({reply , lastReply}) => {

    const showToast = useShowToast();
    
    // console.log(reply.username)

    const [ commentProfile , setCommentProfile] = useState("")
    // const  { user , loading } = useGetUserProfile()
        // const userProfileImage = user.profilePic;

    // if(user){
    //     console.log(userProfileImage)
    // }

const username = reply.username;




    useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				if (data.isFrozen) {
					setCommentProfile(null);
					return;
				}
				setCommentProfile(data);
                // console.log(data)
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getUser();
	}, [username, showToast]);


    return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={commentProfile.profilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
					</Flex>
					<Text>{reply.text}</Text>
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);


};
















    // const toast = useToast()
    // console.log(reply);
    // const copyThreadLink = () => {
    //     const currentLocation = "markzukarbarg/post/1";
    //     navigator.clipboard.writeText(currentLocation).then(() => {
    //         toast({
    //             description: "URl Copied to Clipboard.",
    //             status: 'success',
    //             duration: 1000,
    //             isClosable: true,
    //         })
    //     })
    // }


   

    // return (
    //     <div>
    //         <Flex gap={2} py={2} w={"full"}>
    //             <Avatar src={src} size={"sm"} />
    //             <Flex gap={1} w={"full"} flexDirection={"column"}>
    //                 <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    //                     <Text fontSize={"sm"} fontWeight={"bold"}>{name}</Text>

    //                     <Flex gap={2} alignItems={"center"}>
    //                         <Text fontStyle={"sm"} color={"gray.light"} >1d</Text>
    //                         <Menu>
    //                             <MenuButton>
    //                                 <BsThreeDots ></BsThreeDots>
    //                             </MenuButton>
    //                             <MenuList bg={"gray.dark"}>
    //                                 <MenuItem bg={"gray.dark"} onClick={copyThreadLink}>Copy Thread Link</MenuItem>
    //                             </MenuList>
    //                         </Menu>
    //                     </Flex>
    //                 </Flex>
    //                 <Text>{comment}</Text>
    //                 <Actions liked={liked} setLiked={setLiked}></Actions>
    //                 <Flex gap={2} alignItems={"center"}>
    //                     {/* <Text color={"gray.light"} fontSize={"sm"}>{44} replies</Text>
    //                     <Box mt={1} w={.5} h={.5} borderRadius={"full"} bg={"gray.light"} ></Box> */}
    //                     <Text color={"gray.light"} fontSize={"sm"} >{likes + (liked ? 1 : 0)} likes</Text>
    //                 </Flex>
    //             </Flex>
    //         </Flex>
    //         <Divider my={2} />
    //     </div>
        
    // )

// }

export default Comment
