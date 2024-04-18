import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
const usePreviewImg = () => {
    const toast = useToast();

    const [imgUrl, setImgUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        }
        else {
            toast({
                title: "Invalid file type",
                description: "Please select an image file",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            setImgUrl(null)
            return;
        }
    }
    // console.log(imgUrl)
    return { handleImageChange, imgUrl  ,setImgUrl}
}

export default usePreviewImg
