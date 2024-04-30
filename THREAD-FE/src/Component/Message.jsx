// import React from 'react'

// const Message = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Message


import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
// import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const Message = ({  ownMessage }) => {
	// const selectedConversation = useRecoilValue(selectedConversationAtom);
	// const user = useRecoilValue(userAtom);
	// const [imgLoaded, setImgLoaded] = useState(false);
	return (
		<>
			{ownMessage ? (
				<Flex gap={2} alignSelf={"flex-end"}>
					{/* {message.text && ( */}
						<Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
							<Text color={"white"}>
              
               sdfjasd fasjdf asdfabhsdfljbnasdfasdasefmasdfjasfasdf
              asdfasdfasdf asrdfasdf
              
              </Text>
							{/* <Box
								alignSelf={"flex-end"}
								ml={1}
								color={message.seen ? "blue.400" : ""}
								fontWeight={"bold"}
							>
								<BsCheck2All size={16} />
							</Box> */}
						</Flex>
					{/* )} */}
					{/* {message.img && !imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image
								src={message.img}
								hidden
								onLoad={() => setImgLoaded(true)}
								alt='Message image'
								borderRadius={4}
							/>
							<Skeleton w={"200px"} h={"200px"} />
						</Flex>
					)}

					{message.img && imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image src={message.img} alt='Message image' borderRadius={4} />
							<Box
								alignSelf={"flex-end"}
								ml={1}
								color={message.seen ? "blue.400" : ""}
								fontWeight={"bold"}
							>
								<BsCheck2All size={16} />
							</Box>
						</Flex>
					)} */}

					<Avatar src="" w='7' h={7} />
				</Flex>
			) : (
				<Flex gap={2}>
					<Avatar src="" w='7' h={7} />

					{/* {message.text && ( */}
						<Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
						 sf asefasdf asdfasdfas as awdsfasdfasdf asd ase faswef scvzxdsf vasd 
						</Text>
					{/* )} */}
					{/* {message.img && !imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image
								src={message.img}
								hidden
								onLoad={() => setImgLoaded(true)}
								alt='Message image'
								borderRadius={4}
							/>
							<Skeleton w={"200px"} h={"200px"} />
						</Flex>
					)}

					{message.img && imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image src={message.img} alt='Message image' borderRadius={4} />
						</Flex>
					)} */}
				</Flex>
			)}
		</>
	);
};

export default Message;