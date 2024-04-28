import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import postAtom from "../atom/postAtom";
import replyAtom from "../atom/replyAtom";

const Post = ({ post, postedBy }) => {
	console.log(post)
	const [user, setUser] = useState(null);
	const showToast = useShowToast();
	const navigate = useNavigate();
	const currentUser = useRecoilValue(userAtom);
	const [posts, setPosts] = useRecoilState(postAtom);
	const [reply, setReply] = useRecoilState(replyAtom);

	// const [posts, setPosts] = useRecoilState(postAtom);

	const [id0 , setId0] = useState("");
	const [id1 , setId1] = useState("");
	const [id2 , setId2] = useState("");

	const handleDeletePost = async (e) => {
		try {
			e.preventDefault();
			if(!window.confirm("Are you sure to[ delete this post ?")) return ;

			const res = await fetch(`/api/posts/${post._id}` , {
				method: "DELETE"
			})
			showToast("Success" , "Post Deleted Successfully" , "success")
			// navigate(`/${user.username}`)
			const data = await res.json();
			if(data.error){
				showToast("Error" , data.error , "error")
			}
			setPosts(posts.filter((p) => p._id !== post._id));
			
		} catch (error) {
			showToast("Error" , error.message , "error");

		}
	}	

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch("/api/users/profile/" + postedBy);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data)
				setUser(data);
                // console.log(post)
			} catch (error) {
				showToast("Error", error.message, "error");
				setUser(null);
			}
		};

		const a = post.replies[0]?.userId
		const b = post.replies[1]?.userId
		const c = post.replies[2]?.userId
		const getUser0 = async () => {
			try {
				const res = await fetch(`/api/users/profile/${a}`);
				const data = await res.json();
				if (data.error) {
					// showToast("Error", data.error, "error");
					return;
				}
				 setId0(data.profilePic)
                // console.log(data)
			} catch (error) {
				showToast("Error", error.message, "error");
			} 
		};
		getUser0();
		const getUser1 = async () => {
			try {
				const res = await fetch(`/api/users/profile/${b}`);
				const data = await res.json();
				if (data.error) {
					// showToast("Error", data.error, "error");
					return;
				}
				 setId1(data.profilePic)
                console.log(data)
			} catch (error) {
				showToast("Error", error.message, "error");
			} 
		};
		getUser1();

		const getUser2 = async () => {
			try {
				const res = await fetch(`/api/users/profile/${c}`);
				const data = await res.json();
				if (data.error) {
					// showToast("Error", data.error, "error");
					return;
				}
				 setId2(data.profilePic)
                console.log(data)
			} catch (error) {
				showToast("Error", error.message, "error");
			} 
		};
		getUser2();



		getUser();
	}, [postedBy, showToast , setPosts  ]);


if (!user) return null;
	return (
		<Link to={`/${user.username}/post/${post._id}`}>
			<Flex gap={3} mb={4} py={5}>
				<Flex flexDirection={"column"} alignItems={"center"}>
					<Avatar
						size='md'
						name={user.name}
						src={user?.profilePic}
						onClick={(e) => {
							e.preventDefault();
							navigate(`/${user.username}`);
						}}
					/>
					<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
					<Box position={"relative"} w={"full"}>
						{post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
						{post.replies[0] && (
							<Avatar
								size='xs'
								name={post.username}
								src={id0}
								position={"absolute"}
								top={"0px"}
								left='15px'
								padding={"2px"}
							/>
						)}

						{post.replies[1] && (
							<Avatar
								size='xs'
								name={post.username}
								src={id1}
								position={"absolute"}
								bottom={"0px"}
								right='-5px'
								padding={"2px"}
							/>
						)}

						{post.replies[2] && (
							<Avatar
								size='xs'
								name={post.username}
								src={id2}
								position={"absolute"}
								bottom={"0px"}
								left='4px'
								padding={"2px"}
							/>
						)}
					</Box>
				</Flex>
				<Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text
								fontSize={"sm"}
								fontWeight={"bold"}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/${user.username}`);
								}}
							>
								{user?.username}
							</Text>
							<Image src='/verified.png' w={4} h={4} ml={1} />
						</Flex>
						<Flex gap={4} alignItems={"center"}>
						  <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
							</Text>

							  {/* <DeleteIcon size={20}  />  */}
							{currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}  
						</Flex>
					</Flex>

					<Text fontSize={"sm"}>{post.text}</Text>
					{post.img && (
						<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
							<Image src={post.img} w={"full"} />
						</Box>
					)}

					<Flex gap={3} my={1}>
						<Actions post={post} />
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export default Post;
