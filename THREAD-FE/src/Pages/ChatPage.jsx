// import { Box , Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { GiConversation } from "react-icons/gi";


import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue, useStatStyles } from "@chakra-ui/react";
// import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import Conversation from '../Component/Conversation';
import MessageContainer from '../Component/MessageContainer';
// import MessageContainer from "../components/MessageContainer";
// import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from 'recoil';
// import  conversationAtom  from '../atom/messageAtom.js';
// import { useRecoilState, useRecoilValue } from "recoil";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import userAtom from "../atoms/userAtom";
// import { useSocket } from "../context/SocketContext";
import { conversationsAtom, selectedConversationAtom } from "../atom/messagesAtom"
import userAtom from '../atom/userAtom';



const ChatPage = () => {

	const [ loadingConversations , setLoadingConversations] = useState(true);
	const [conversations , setConversations] = useRecoilState(conversationsAtom)
	const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
	const currentUser = useRecoilValue(userAtom)
	const [searchText , setSearchText] = useState("")
	const [searchingUser , setSearchinguser] = useState(false)


const showToast = useShowToast()
	useEffect(() => {

		const getConversations = async () => {
			try {
				const res= await fetch("/api/messages/conversations");
				const data = await res.json();

				if(data.error){
					showToast("Error" , data.error , "error")
					return;
				}
				console.log(data)
				setConversations(data)
			} catch (error) {
				showToast("Error" , error.message , "error");
				setLoadingConversations(false)
				return
			} finally{
				setLoadingConversations(false);
			}
		}
		getConversations();
	} , [showToast , setConversations])

	const handleConversationSearch = async (e) => {
		e.preventDefault();
		setSearchinguser(true)
		try {
			const res = await fetch(`/api/users/profile/${searchText}`)
			const searchUser = await res.json();

			if(searchUser.error){
				showToast("Error" , searchUser.error , "error");
				return;
			}
			// console.log(searchUser);
			// user can't message himself/herself ..
			if(searchUser._id === currentUser._id){
				showToast("Error" , "You Can not Send message yourself" , "error");
				return;
			}

			// if user already exist in  conversations list

			if(conversations.find((conversation) => conversation.participants[0]._id === searchUser._id)){
				setSelectedConversation({
					_id:conversations.find((conversation) => conversation.participants[0]._id === searchUser._id)._id,
					userId : searchUser._id,
			        username : searchUser.username,
			        userProfilePic : searchUser.profilePic,

				});
				return
			}


			const mockConversation = {
				mock: true,
				lastMessage: {
					text: "",
					sender: "",
				},
				_id: Date.now(),
				participants: [
					{
						_id: searchUser._id,
						username: searchUser.username,
						profilePic: searchUser.profilePic,
					},
				],
			};


			setConversations((prevConvs) => [...prevConvs, mockConversation]);
		} catch (error) {
			showToast("Error" , error.message , "error");
		} finally{
			setSearchinguser(false)
		}
	}

    return (
        <Box position={"absolute"} w={{
            base: "100%",
            md: "80%",
            lg: "750px"
          }} 
          left={"50%"} 
          transform={"translateX(-50%)"}
          p={4}
           >
            <Flex
                gap={4}
                flexDirection={{ base: "column", md: "row" }}
                maxW={{
                    sm: "400px",
                    md: "full",
                }}
                mx={"auto"}
            >

            <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
					<Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
						Your Conversations
					</Text>
					<form onSubmit={handleConversationSearch}>
						<Flex alignItems={"center"} gap={2}>
							<Input placeholder='Search for a user' onChange={(e) => setSearchText(e.target.value)}/>
							<Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser} >
								<SearchIcon />
							</Button>
						</Flex>
					</form>

					{loadingConversations &&
						[0, 1, 2, 3, 4].map((_, i) => (
							<Flex  gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
								<Box>
									<SkeletonCircle size={"10"} />
								</Box>
								<Flex w={"full"} flexDirection={"column"} gap={3}>
									<Skeleton h={"10px"} w={"80px"} />
									<Skeleton h={"8px"} w={"90%"} />
								</Flex>
							</Flex>
						))}

				 {/* {!loadingState && ( <Conversation /> )}  */}
					{!loadingConversations &&
						conversations.map((conversation) => (
							 
							 	 <Conversation  key={conversation._id} conversation={conversation} />
							 
						))}
				</Flex>
				{!selectedConversation._id && (




					<Flex
						flex={70}
						borderRadius={"md"}
						p={2}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						height={"400px"}
					>
						<GiConversation size={100} />
						<Text fontSize={20}>Select a conversation to start messaging</Text>
					</Flex>


					
				)}

				{selectedConversation._id && <MessageContainer /> }

				  {/* <MessageContainer />  */}
			</Flex>
		</Box>
	);
};

export default ChatPage;




{/* 
            </Flex>
        </Box>
    )
}

export default ChatPage */}
