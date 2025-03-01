import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";

const AlertsPage = () => {
    const [alerts, setAlerts] = useState([]);
    const userName = "Ravi12"; // 🔹 Replace with actual logged-in user name
    const [uid, setuid] = useState("");
    

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                console.log("Fetching alerts for user:", userName);
                
                const postsRef = collection(firestore, "posts");
                const qu = query(postsRef, where("createdBy", "==", JSON.parse( localStorage.getItem("user-info")).uid));
                const querySnapshot = await getDocs(qu);
                // const querySnapshot = await getDocs(postsRef);

                let newAlerts = [];
                const now = new Date();

                querySnapshot.forEach((docSnap) => {
                    const post = docSnap.data();
                    const postId = docSnap.id;

                    const likes = typeof post.likes === "number" ? post.likes : 0;
                    const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;

                    // 🔥 Trending Post Alert
                    if (likes >= 10 || commentsCount >= 10) {
                        newAlerts.push({
                            message: `Your post is trending! (${likes} likes, ${commentsCount} comments)`,
                            createdAt: post.createdAt,
                            type: "trending",
                            postId: postId
                        });
                    }

                    // 🚨 Negative Comment Alert
                    if (Array.isArray(post.comments)) {
                        post.comments.forEach(comment => {
                            const commentText = comment.comment.toLowerCase();
                            const negativeWords = ["bad", "worst", "hate", "terrible", "awful", "trash", "stupid", "idiot"];
                            
                            if (negativeWords.some(word => commentText.includes(word))) {
                                newAlerts.push({
                                    message: `Negative comment detected: "${comment.comment}"`,
                                    createdAt: comment.createdAt,
                                    type: "negative",
                                    postId: postId
                                });
                            }

                            // 🔔 Mention Alert - Detecting "@vivek" or "vivek"
                            const mentionRegex = new RegExp(`@?\\b${userName}\\b`, "i"); // Matches 'vivek' or '@vivek'
                            if (mentionRegex.test(commentText)) {
                                newAlerts.push({
                                    message: `You were mentioned in a comment: "${comment.comment}"`,
                                    createdAt: comment.createdAt,
                                    type: "mention",
                                    postId: postId
                                });
                            }
                        });
                    }

                    // ⏳ Scheduled Post Alert
                    if (post.scheduledTime) {
                        const scheduledTime = new Date(post.scheduledTime);
                        const timeDiff = (scheduledTime - now) / (1000 * 60);

                        if (timeDiff > 0 && timeDiff <= 30) {
                            newAlerts.push({
                                message: `Your scheduled post is going live in ${Math.round(timeDiff)} minutes!`,
                                createdAt: post.scheduledTime,
                                type: "scheduled",
                                postId: postId
                            });
                        }
                    }
                });

                // Add New Follower Alert
                const followersRef = collection(firestore, "followers");
                const q = query(followersRef, where("followedUser", "==", userName));
                const followerSnapshot = await getDocs(q);

                followerSnapshot.forEach(doc => {
                    const followerData = doc.data();
                    if (followerData.followedUser === userName && !followerData.alerted) {
                        newAlerts.push({
                            message: `${followerData.followerName} is now following you!`,
                            createdAt: new Date(),
                            type: "newFollower",
                            postId: null
                        });

                        // Mark as alerted (Firestore update can be done here)
                        // await updateDoc(doc.ref, { alerted: true });
                    }
                });

                // Sorting alerts based on priority
                newAlerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setAlerts(newAlerts);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };

        fetchAlerts();
    }, [uid]);

    return (
        <Box p={5}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Alerts</Text>
            <VStack align="start" spacing={3} p={3} bg="gray.800" borderRadius={6}>
                {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                        <RouterLink key={index} to={`/post/${alert.postId || ''}`}>
                            <Text fontSize="md" 
                                  color={
                                    alert.type === "trending" ? "green.400" :
                                    alert.type === "mention" ? "yellow.400" :
                                    alert.type === "scheduled" ? "blue.400" :
                                    alert.type === "newFollower" ? "purple.400" :
                                    "red.400"
                                  } 
                                  _hover={{ textDecoration: "underline" }}>
                                {alert.message}
                            </Text>
                        </RouterLink>
                    ))
                ) : (
                    <Text fontSize="md" color="gray.400">No new alerts</Text>
                )}
            </VStack>
        </Box>
    );
};

export default AlertsPage;
