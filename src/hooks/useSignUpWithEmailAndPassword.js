import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { sendEmailVerification, signOut } from "firebase/auth";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();

    const signup = async (inputs, setIsLogin) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if (!newUser?.user) {
                showToast("Error", error?.message || "Signup failed", "error");
                return;
            }

            // Send email verification
            await sendEmailVerification(newUser.user);
            showToast("Success", "Verification email sent. Please check your inbox.", "success");

            // **🚀 Critical Fix:** Sign out immediately before UI updates
            await signOut(auth);

            // **🚀 Ensure instant UI switch:** Set login form **before** storing user in Firestore
            setIsLogin(true);

            // Create user document in Firestore **after** setting login state
            const userDoc = {
                uid: newUser.user.uid,
                email: inputs.email,
                username: inputs.username,
                fullName: inputs.fullName,
                bio: "",
                profilePicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: Date.now(),
                emailVerified: false,
            };

            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;