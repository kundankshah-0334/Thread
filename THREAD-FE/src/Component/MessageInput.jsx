import {
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";

import { IoSendSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { conversationsAtom, selectedConversationAtom } from "../atom/messagesAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const MessageInput = ({setMessages}) => {

    const [messageText, setMessageText] = useState("");
 const selectedConversation = useRecoilValue(selectedConversationAtom);
 
 const setConversations = useSetRecoilState(conversationsAtom);

//  const setConversations = useRecoilState(conversationsAtom)
	const showToast = useShowToast();

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if(!messageText) return;
		// setIsSending(true);
		try {
			const res = await fetch("api/messages" , {
				method:"POST",
				headers:{
					"Content-Type" : "application/json",
				},
				body:JSON.stringify({
					message : messageText,
					recipientId: selectedConversation.userId,
				}),
			})
			const data = await  res.json();

			console.log(data)
			if(data.error){
				showToast("Error" , data.error , "error");
				return;
			}
			setMessages((messages) => [...messages , data]);

			setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
			setMessageText("");
		 
		} catch (error) {
			showToast("Error" , error.message , "error")
		} 
	};
	return (
		<Flex gap={2} alignItems={"center"}>
			<form onSubmit={handleSendMessage} style={{ flex: 95 }}>
				<InputGroup>
					<Input
						w={"full"}
						placeholder='Type a message'
						onChange={(e) => setMessageText(e.target.value)}
						value={messageText}
					/>
					<InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
						<IoSendSharp />
					</InputRightElement>
				</InputGroup>
			</form>
			<Flex flex={5} cursor={"pointer"}>
				{/* <BsFillImageFill size={20} onClick={() => imageRef.current.click()} /> */}
				<BsFillImageFill size={20}  />
				<Input type={"file"} hidden />
				{/* <Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} /> */}
			</Flex>
			<Modal
				// isOpen={imgUrl}
				// onClose={() => {
				// 	onClose();
				// 	setImgUrl("");
				// }}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							{/* <Image src={imgUrl} /> */}
							<Image  />
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
							{!true ? (
								<IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
							) : (
								<Spinner size={"md"} />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default MessageInput;
