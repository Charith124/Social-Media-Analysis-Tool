import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);

    // Function to detect negative comments
    const isNegativeComment = (comment) => {
        const negativeWords = ["bad", "worst", "wrost", "hate", "terrible", "awful", "disgusting"];
        return negativeWords.some(word => comment.toLowerCase().includes(word));
    };

    // Function to send alert to post owner
    const sendAlertToUser = async (postId, comment, postOwnerId) => {
        try {
            const userDocRef = doc(firestore, "users", postOwnerId);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                console.error("User document does not exist.");
                return;
            }

            const alertMessage = `Your post received a negative comment: "${comment}"`;
            await updateDoc(userDocRef, {
                alerts: arrayUnion({
                    message: alertMessage,
                    postId,
                    createdAt: Date.now(),
                }),
            });
            console.log("Alert sent successfully.");
        } catch (error) {
            console.error("Error sending alert:", error);
        }
    };

    const handlePostComment = async (postId, comment, postOwnerId) => {
        if (isCommenting) return;
        if (!authUser) return showToast("Error", "You must be logged in to comment", "error");

        setIsCommenting(true);
        const newComment = {
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId,
        };

        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment),
            });
            addComment(postId, newComment);

            // Check if the comment is negative and send alert
            if (isNegativeComment(comment)) {
                console.log("Negative comment detected:", comment);
                await sendAlertToUser(postId, comment, postOwnerId);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsCommenting(false);
        }
    };

    return { isCommenting, handlePostComment };
};

export default usePostComment;
