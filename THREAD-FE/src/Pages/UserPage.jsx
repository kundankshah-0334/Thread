import { useEffect, useState } from "react"
import UserHeader from "../../src/Component/UserHeader"
import UserPost from "../../src/Component/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner } from "@chakra-ui/react";
const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json();
        console.log(data)
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false)
      }
    }
    getUser();

  }, [username, showToast]);

  if(!user && loading) {
    return(
      <Flex justifyContent={"center"}>
      <Spinner size="xl" />
   </Flex>
    )
   
  }
  if (!user && !loading) {
    return <h1>User Not Found</h1>
  }

  return (
    <div>
      <UserHeader user={user} />
      {/* <UserPost likes={1272} replies={672} postImg="/post1.png" postTitle="Let's play cricket"/> */}
      <UserPost likes={690} replies={339} postImg="/post2.png" postTitle="Be Kind" />
      <UserPost likes={729} replies={1066} postImg="/post3.png" postTitle="Sweet mangos" />
      <UserPost likes={5591} replies={506} postImg="/post2.png" postTitle="Create your project first." />
      <UserPost likes={110} replies={243} postImg="/post1.png" postTitle="This is my first Thread." />

    </div>
  )
}

export default UserPage
