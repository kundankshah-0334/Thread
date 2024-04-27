import { AddIcon } from '@chakra-ui/icons'
import {  Modal,Button ,useColorModeValue ,Image ,  ModalCloseButton , ModalOverlay, ModalContent,   ModalHeader, ModalFooter,  ModalBody, useDisclosure, FormControl, Textarea , Text, Input, Flex, CloseButton } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import useShowToast from "../hooks/useShowToast"
import postAtom from '../atom/postAtom';
import { useParams } from 'react-router-dom';

const CreatePost = () => {

  const {username} = useParams();

  const [posts, setPosts] = useRecoilState(postAtom);


  const [loading , setLoading] = useState(false)
  const user = useRecoilValue(userAtom);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText , setPostText] = useState("");
    const { handleImageChange, imgUrl , setImgUrl } = usePreviewImg();
    const imageRef = useRef(null)
    const MAX_CHAR = 500;
    const [reamainingChar , setRemainingChar] = useState(MAX_CHAR)
    const showToast = useShowToast();
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if(inputText > MAX_CHAR){
            const truncatedText = inputText.slice(0 , MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        }else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }

    }
    const handleCreatePost = async () => {
      setLoading(true)
    try {
      const res = await fetch("/api/posts/create" , {
        method :"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({postedBy : user._id , text : postText , img : imgUrl})
      })

      const data = await res.json();
      if(data.error){
        showToast("Error" , data.error , "error")
      }
      showToast("Success" , "Post Created Successfully" , "success")
      if(username === user.username){

        setPosts([data , ...posts]);
      }
      onClose();
      setPostText("")
      setImgUrl("")
    } catch (error) {
      // showToast("Error" , error , "error")
      // res.status(400).json({ error: "Invalid User data" });
    } finally {
      setLoading(false);
    }
    }
  return (
    <>
        <Button onClick={onOpen}  position={"fixed"} bottom={10} right={10} leftIcon={<AddIcon />} bg={useColorModeValue("gray.300" , "gray.dark")}>
            Post
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           <FormControl >
            <Textarea 
                placeholder='Post content goes here'
                onChange={handleTextChange}
                value={postText}
            />
            <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            textAlign={"right"}
            m={"1"}
            color={"gray.800"}
            >{reamainingChar}/{MAX_CHAR}</Text>

            <Input 
             type='file'
             hidden
             ref={imageRef}
             onChange={handleImageChange}
             />

             <BsFillImageFill 
             style={{ marginLeft :"5px" , cursor: "pointer"}}
              size={16}
              onClick={()=> imageRef.current.click()}
              />
           </FormControl>
           {imgUrl && (
            <Flex mt={5} w={"full"} position={"relative"}>
            <Image src={imgUrl} alt="Selected Image" />
            <CloseButton
            onClick={() => {
                setImgUrl("");
            }}
            bg={"gray.800"}
            position={"absolute"}
            right={2}
            top={2}
             />

            </Flex>
           )}
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} colorScheme='blue' mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost
