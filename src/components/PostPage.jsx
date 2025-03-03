import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import {
    Box,
    Avatar,
    Text,
    VStack,
    Image,
    Flex,
    Divider,
    Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import Comment from "../components/Comment/Comment";  // ✅ Fixed import
import PostFooter from "../components/FeedPosts/PostFooter"; // ✅ Fixed import

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(firestore, "posts", postId);
                const postSnap = await getDoc(postRef);
                if (postSnap.exists()) {
                    setPost(postSnap.data());
                } else {
                    console.error("Post not found");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (postId) fetchPost();
    }, [postId]);

    if (loading) return <Text>Loading...</Text>;
    if (!post) return <Text>Post not found</Text>;

    return (
        <Box p={5} maxW="600px" mx="auto">
            {/* Post Header */}
            <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" gap={4}>
                    {userProfile && (
                        <>
                            <Avatar src={userProfile.profilePicURL} size={"sm"} />
                            <Text fontWeight={"bold"}>{userProfile.username}</Text>
                        </>
                    )}
                </Flex>
            </Flex>

            <Divider my={4} />

            {/* Post Image */}
            {post.imageURL && (
                <Box borderRadius={6} overflow="hidden">
                    <Image src={post.imageURL} alt="Post Image" />
                </Box>
            )}

            {/* Caption */}
            {post.caption && (
                <Text mt={3} fontSize="md">
                    {post.caption}
                </Text>
            )}

            {/* Likes and Comments */}
            <Flex mt={3} alignItems="center" gap={4}>
                <Flex alignItems="center">
                    <AiFillHeart size={20} />
                    <Text ml={2} fontWeight="bold">{post.likes?.length || 0}</Text>
                </Flex>

                <Flex alignItems="center">
                    <FaComment size={20} />
                    <Text ml={2} fontWeight="bold">{post.comments?.length || 0}</Text>
                </Flex>
            </Flex>

            <Divider my={4} />

            {/* Comments Section */}
            <VStack align="start" spacing={3}>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))
                ) : (
                    <Text color="gray.400">No comments</Text>
                )}
            </VStack>

            <Divider my={4} />
            
            {/* Post Footer */}
            <PostFooter post={post} />
        </Box>
    );
};

export default PostPage;
