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
import { useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { conversationsAtom, selectedConversationAtom } from "../atom/messagesAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import usePreviewImg from "../hooks/usePreviewImg";
const MessageInput = ({setMessages}) => {

    const [messageText, setMessageText] = useState("");
 const selectedConversation = useRecoilValue(selectedConversationAtom);
 
 const setConversations = useSetRecoilState(conversationsAtom);

//  const setConversations = useRecoilState(conversationsAtom)
	const showToast = useShowToast();
	const imageRef = useRef(null);
	const { onClose } = useDisclosure();

	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const [isSending, setIsSending] = useState(false);



	const handleSendMessage = async (e) => {
		e.preventDefault();
		if(!messageText && !imgUrl) return;
		if(isSending) return;
		setIsSending(true);
		try {
			const res = await fetch("api/messages" , {
				method:"POST",
				headers:{
					"Content-Type" : "application/json",
				},
				body:JSON.stringify({
					message : messageText,
					recipientId: selectedConversation.userId,
					img:imgUrl,
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
			setImgUrl("");
		 
		} catch (error) {
			showToast("Error" , error.message , "error")
		} finally{
			setIsSending(false)
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
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				 
				{/* <Input type={"file"} hidden /> */}
				{/* <Input type={"file"} hidden ref={imageRef}   /> */}
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />
			</Flex>
			<Modal
				isOpen={imgUrl}
				onClose={() => {
					onClose();
					setImgUrl("");
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							{/* <Image  src={"https://res.cloudinary.com/dojjkbmsn/image/upload/v1713116704/jmnmudigtnoppqex7qpx.png"} */}
							{/* /> */}
							<Image src={imgUrl} />
							{/* <Image  /> */}
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
								{/* <IoSendSharp size={24} cursor={"pointer"}   onClick={handleSendMessage} /> */}
								{/* <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} /> */}
							{!isSending ? (
									<IoSendSharp size={24} cursor={"pointer"}   onClick={handleSendMessage} />
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
