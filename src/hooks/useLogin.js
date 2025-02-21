import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { sendEmailVerification, signOut } from "firebase/auth"; 
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error");
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred?.user) {
                // Check if email is verified
                if (!userCred.user.emailVerified) {
                    showToast("Error", "Email not verified. Please check your inbox.", "error");
                    await signOut(auth); // Prevent unverified login
                    return;
                }

                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                    loginUser(docSnap.data());
                    showToast("Success", "Login successful!", "success");
                } else {
                    showToast("Error", "User data not found.", "error");
                }
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, login };
};

export default useLogin;
