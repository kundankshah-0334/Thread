import { useState } from "react"
import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

const Comment = ({ name , src , likes , comment}) => {

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
        <div>
            <Flex gap={2} py={2} w={"full"}>
                <Avatar src={src} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{name}</Text>

                        <Flex gap={2} alignItems={"center"}>
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
                    <Text>{comment}</Text>
                    <Actions liked={liked} setLiked={setLiked}></Actions>
                    <Flex gap={2} alignItems={"center"}>
                        {/* <Text color={"gray.light"} fontSize={"sm"}>{44} replies</Text>
                        <Box mt={1} w={.5} h={.5} borderRadius={"full"} bg={"gray.light"} ></Box> */}
                        <Text color={"gray.light"} fontSize={"sm"} >{likes + (liked ? 1 : 0)} likes</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Divider my={2} />
        </div>
        
    )
}

export default Comment
