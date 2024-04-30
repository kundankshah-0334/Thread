// import React from 'react'

// const MessageInput = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default MessageInput

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

const MessageInput = () => {

    const [messageText, setMessageText] = useState("");

	const handleSendMessage = async (e) => {
		e.preventDefault();

		setIsSending(true);

		try {
		 
		} catch (error) {
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
