import { Avatar, Box, Text, Link, Flex, VStack, Button } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useToast } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, Portal, } from '@chakra-ui/react'
import { useRecoilValue } from "recoil"
import userAtom from "../atom/userAtom"
import { Link as RouterLink } from "react-router-dom"
import { useState } from "react"
import useShowToast from "../hooks/useShowToast"

const UserHeader = ({ user }) => {

    const showToast = useShowToast();
    const toast = useToast()
    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))
    const [updating, setUpdating] = useState(false);


    console.log(following);
    const copyURL = () => {
        const currentLocation = window.location.href;
        navigator.clipboard.writeText(currentLocation).then(() => {
            toast({
                description: "URl Copied to Clipboard.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
        })
    }

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast("Error", "Please login to follow", "error");
            return;
        }
        if (updating) return;
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json();
            if (data.error) {
                showToast("Error", error, "error");
                return;
            }
            if (following) {
                showToast("Success", `Unfollowed ${user.username}`, "success");
                user.followers.pop();
            } 
            else {
                showToast("Success", `Followed ${user.username}`, "success");
                user.followers.push(currentUser?._id);
            }
            setFollowing(!following)
            console.log(data);

        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setUpdating(false);
        }
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} >
                            {user.username}
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar
                            name={user.name}
                            src={user.profilePic}
                            size={{
                                base: "md",
                                md: "xl"
                            }} />
                    )}
                    {!user.profilePic && (
                        <Avatar
                            name={user.name}
                            src="https://bit.ly/broken-link"
                            size={{
                                base: "md",
                                md: "xl"
                            }} />
                    )}
                </Box>
            </Flex>
            <Text>  {user.bio}</Text>

            {currentUser?._id === user._id && (
                <Link as={RouterLink} to='/update'>
                    <Button size={"sm"} >Update profile</Button>
                </Link>
            )}
            {currentUser?._id !== user._id && (
                <Link as={RouterLink} to='/follow'>
                    <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                </Link>
            )}
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>  {user.followers.length}</Text>
                    <Box mt={1} w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>


                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>


            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    )
}

export default UserHeader
