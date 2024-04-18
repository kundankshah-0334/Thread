import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from "./Actions"
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from "react"


const Post = ({ post, userId }) => {

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
                <Box w="1px" h={"full"} bg={"gray.light"} my={2}>  </Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar name='Prosper Otemuyiwa' padding={"2px"} size={"xs"} src='https://bit.ly/dan-abramov' position={"absolute"} top={"0px"} left={"15px"} />
                    <Avatar name='Ryan Florence' padding={"2px"} size={"xs"} src='https://bit.ly/ryan-florence' position={"absolute"} bottom={"0px"} right={"-5px"} />
                    <Avatar name='Segun Adebayo' padding={"2px"} size={"xs"} src='https://bit.ly/sage-adebayo' position={"absolute"} bottom={"0px"} left={"4px"} />
                </Box>
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
                <Text fontSize={"sm"}>{post.text}</Text>
                {post.img && (
                    <Box borderRadius={5} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                        <Link to={"markzukarbarg/post/1"}>
                            <Image src={post.img}></Image>
                        </Link>
                    </Box>
                )}

                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked} />
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
                    <Box mt={1} w={.5} h={.5} borderRadius={"full"} bg={"gray.light"} ></Box>
                    <Text color={"gray.light"} fontSize={"sm"} >{post.likes.length} likes</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Post
