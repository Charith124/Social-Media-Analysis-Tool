import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Box, Text, VStack } from "@chakra-ui/react";

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <Box p={5}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>{post.title || "Post Details"}</Text>
            <Text>{post.content}</Text>
            <VStack align="start" mt={4}>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                        <Text key={index} color="gray.300">{comment.comment}</Text>
                    ))
                ) : (
                    <Text color="gray.400">No comments</Text>
                )}
            </VStack>
        </Box>
    );
};

export default PostPage;
