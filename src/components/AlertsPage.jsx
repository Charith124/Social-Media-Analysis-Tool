import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";

const AlertsPage = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchNegativeComments = async () => {
            try {
                const postsRef = collection(firestore, "posts");
                const q = query(postsRef, where("comments", "!=", []));
                const querySnapshot = await getDocs(q);

                let negativeAlerts = [];
                querySnapshot.forEach((docSnap) => {
                    const post = docSnap.data();
                    const postId = docSnap.id;
                    if (post.comments) {
                        post.comments.forEach(comment => {
                            const commentText = comment.comment.toLowerCase();
                            const negativeWords = [
                                "bad", "worst", "wrost", "hate", "terrible", "awful", "disgusting",
                                "horrible", "trash", "garbage", "stupid", "idiot", "dumb", "nonsense",
                                "useless", "pathetic", "failure", "lame", "cringe", "sucks", "broken",
                                "buggy", "lazy", "ridiculous", "pointless", "foolish", "meaningless",
                                "weak", "unacceptable", "dreadful", "atrocious", "disaster", "mess",
                                "frustrating", "nasty", "gross", "vile", "insulting", "offensive",
                                "hopeless", "worthless", "annoying", "painful", "miserable", "displeasing",
                                "horrendous", "detestable", "abhorrent", "repulsive", "hideous", "appalling",
                                "shameful", "embarrassing", "depressing", "laughable", "absurd", "outrageous",
                                "shocking", "heinous", "obnoxious", "unforgivable", "despicable", "inexcusable",
                                // ... include additional words as needed
                            ];
                            const negativeMatchCount = negativeWords.filter(word => commentText.includes(word)).length;
                            if (negativeMatchCount > 0) {
                                negativeAlerts.push({
                                    message: `Negative comment detected: "${comment.comment}"`,
                                    createdAt: comment.createdAt,
                                    score: negativeMatchCount,
                                    postId: postId
                                });
                            }
                        });
                    }
                });
                
                // Sort by severity (higher negative word count first)
                negativeAlerts.sort((a, b) => b.score - a.score);
                setAlerts(negativeAlerts);
            } catch (error) {
                console.error("Error fetching negative comments:", error);
            }
        };

        fetchNegativeComments();
    }, []);

    return (
        <Box p={5}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Negative Comments</Text>
            <VStack align="start" spacing={3} p={3} bg="gray.800" borderRadius={6}>
                {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                        <RouterLink key={index} to={`/post/${alert.postId}`}>
                            <Text fontSize="md" color="white" _hover={{ textDecoration: "underline" }}>
                                {alert.message} (Severity: {alert.score})
                            </Text>
                        </RouterLink>
                    ))
                ) : (
                    <Text fontSize="md" color="gray.400">No negative comments</Text>
                )}
            </VStack>
        </Box>
    );
};

export default AlertsPage;
