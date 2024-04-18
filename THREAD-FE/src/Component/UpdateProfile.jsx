import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center, } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import userAtom from '../atom/userAtom'
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

export default function UpdateProfile() {
    const [user, setUser] = useRecoilState(userAtom);

    const [inputs, setInput] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        bio: user.bio,
        profilePic: user.profilePic
    })
    const fileRef = useRef(null)
    const showToast = useShowToast();

    const { handleImageChange, imgUrl  } = usePreviewImg();
    const [updating, setUpdating] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updating) return;
        setUpdating(true)

        try {
            const res = await fetch(`api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl })
            })
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Update", "success")
            setUser(data);
            localStorage.setItem("user-thread", JSON.stringify(data));
            console.log(data);



        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setUpdating(false);

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                align={'center'}
                justify={'center'} >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    mb={5}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        {/* <FormLabel>User Icon</FormLabel> */}
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic} />
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                                <Input type='file' onChange={handleImageChange} hidden ref={fileRef} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder="FullName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.name}
                            onChange={(e) => setInput({ ...inputs, name: e.target.value })}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.username}
                            onChange={(e) => setInput({ ...inputs, username: e.target.value })}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={inputs.email}
                            onChange={(e) => setInput({ ...inputs, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="Your Bio ..."
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.bio}
                            onChange={(e) => setInput({ ...inputs, bio: e.target.value })}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            value={inputs.password}
                            onChange={(e) => setInput({ ...inputs, password: e.target.value })}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'green.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.500',
                            }} type='submit'
                            isLoading={updating}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}
