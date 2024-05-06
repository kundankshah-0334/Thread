import { Box, Button, Flex, Spinner } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { useEffect, useState } from "react";
import Post from "../Component/Post";
import { useRecoilState } from "recoil";
import postAtom from "../atom/postAtom";
import SuggestedUsers from "../Component/SuggestedUsers";

const Homepage = () => {
    const [posts, setPosts] = useRecoilState(postAtom);

    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const ShowToast = useShowToast();
    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true)
            setPosts([])
            try {
                const res = await fetch("/api/posts/feed")
                const data = await res.json();
                if (data.error) {
                    ShowToast("Error", data.error, "error")
                }
                // console.log(data);
                setPosts(data)

            } catch (error) {
                ShowToast("Error", error, "error")
                return;
            } finally {
                setLoading(false)
            }
        }
        getFeedPosts();
    }, [ShowToast, setPosts])

    return (
        <Flex gap={10} alignItems={"flex-start"}>
            <Box flex={70}> 
                {!loading && posts.length === 0 && <h1>Please Follow some users to see the feed .</h1>}


                {loading &&
                    <Flex justifyContent={"center"}>
                        <Spinner size='xl' />
                    </Flex>
                }
                {posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))}
            </Box>
            <Box flex={30} border={"1px soild white"}
             display={{
                base:"none",
                md:"block",
            }}>
               <SuggestedUsers />
            </Box>

        </Flex>
    )
}

export default Homepage
