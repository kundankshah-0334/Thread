import { useEffect, useState } from "react"
import UserHeader from "../../src/Component/UserHeader"
import UserPost from "../../src/Component/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../Component/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtom from "../atom/postAtom";

const UserPage = () => {
  const  { user , loading } = useGetUserProfile()
  const [posts, setPosts] = useRecoilState(postAtom);
  const { username } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  const showToast = useShowToast();

  useEffect(() => {


    const getPosts = async () => {
      if(!user) return ;
      setIsFetching(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json();
        console.log(data)
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
        setPosts([]);
      } finally {
        setIsFetching(false)
      }
    }
    // getUser();
    getPosts();

  }, [username, showToast , setPosts , user]);
console.log("post is here" , posts);
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    )

  }
  if (!user && !loading) {
    return <h1>User Not Found</h1>
  }

  return (
    <>
      <UserHeader user={user} />
      {!isFetching && posts.length === 0 && <h1>No post Found</h1>}
      {isFetching && (
          <Flex justifyContent={"center"} my={12}>
            <Spinner size="xl" />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  )
}

export default UserPage
