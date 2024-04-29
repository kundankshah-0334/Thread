// import { Box , Flex } from '@chakra-ui/react'
import React from 'react'
// import { GiConversation } from "react-icons/gi";


import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
// import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
// import MessageContainer from "../components/MessageContainer";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import userAtom from "../atoms/userAtom";
// import { useSocket } from "../context/SocketContext";



const ChatPage = () => {
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
					<form >
						<Flex alignItems={"center"} gap={2}>
							<Input placeholder='Search for a user' />
							<Button size={"sm"} >
								<SearchIcon />
							</Button>
						</Flex>
					</form>

					{/* {loadingConversations &&
						[0, 1, 2, 3, 4].map((_, i) => ( */}
							<Flex  gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
								<Box>
									<SkeletonCircle size={"10"} />
								</Box>
								<Flex w={"full"} flexDirection={"column"} gap={3}>
									<Skeleton h={"10px"} w={"80px"} />
									<Skeleton h={"8px"} w={"90%"} />
								</Flex>
							</Flex>
						{/* ))} */}

					{/* {!loadingConversations &&
						conversations.map((conversation) => ( */}
							{/* <Conversation */}
								{/* // key={conversation._id}
								// isOnline={onlineUsers.includes(conversation.participants[0]._id)}
								// conversation={conversation} */}
							{/* /> */}
						{/* ))} */}
				</Flex>
				{/* {!selectedConversation._id && ( */}
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
				{/* )} */}

				{/* {selectedConversation._id && <MessageContainer />} */}
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
