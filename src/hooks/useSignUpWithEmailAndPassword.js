<<<<<<< HEAD
=======
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../firebase/firebase";
// import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
// import useShowToast from "./useShowToast";
// import useAuthStore from "../store/authStore";

// const useSignUpWithEmailAndPassword = () => {
// 	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
// 	const showToast = useShowToast();
// 	const loginUser = useAuthStore((state) => state.login);

// 	const signup = async (inputs) => {
// 		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
// 			showToast("Error", "Please fill all the fields", "error");
// 			return;
// 		}

// 		const usersRef = collection(firestore, "users");

// 		const q = query(usersRef, where("username", "==", inputs.username));
// 		const querySnapshot = await getDocs(q);

// 		if (!querySnapshot.empty) {
// 			showToast("Error", "Username already exists", "error");
// 			return;
// 		}

// 		try {
// 			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
// 			if (!newUser && error) {
// 				showToast("Error", error.message, "error");
// 				return;
// 			}
// 			if (newUser) {
// 				const userDoc = {
// 					uid: newUser.user.uid,
// 					email: inputs.email,
// 					username: inputs.username,
// 					fullName: inputs.fullName,
// 					bio: "",
// 					profilePicURL: "",
// 					followers: [],
// 					following: [],
// 					posts: [],
// 					createdAt: Date.now(),
// 				};
// 				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
// 				localStorage.setItem("user-info", JSON.stringify(userDoc));
// 				loginUser(userDoc);
// 			}
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

// 	return { loading, error, signup };
// };

// export default useSignUpWithEmailAndPassword;


// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../firebase/firebase";
// import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
// import { sendEmailVerification, signOut } from "firebase/auth";
// import useShowToast from "./useShowToast";

// const useSignUpWithEmailAndPassword = () => {
//     const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
//     const showToast = useShowToast();

//     const signup = async (inputs) => {
//         if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
//             showToast("Error", "Please fill all the fields", "error");
//             return;
//         }

//         const usersRef = collection(firestore, "users");
//         const q = query(usersRef, where("username", "==", inputs.username));
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//             showToast("Error", "Username already exists", "error");
//             return;
//         }

//         try {
//             const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

//             if (!newUser?.user) {
//                 showToast("Error", error?.message || "Signup failed", "error");
//                 return;
//             }

//             // Send email verification
//             await sendEmailVerification(newUser.user);
//             showToast("Success", "Verification email sent. Please check your inbox.", "success");

//             // Create user document in Firestore
//             const userDoc = {
//                 uid: newUser.user.uid,
//                 email: inputs.email,
//                 username: inputs.username,
//                 fullName: inputs.fullName,
//                 bio: "",
//                 profilePicURL: "",
//                 followers: [],
//                 following: [],
//                 posts: [],
//                 createdAt: Date.now(),
//                 emailVerified: false, // Track email verification
//             };

//             await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

//             // Logout immediately after signup to prevent unverified login
//             await signOut(auth);

//         } catch (error) {
//             showToast("Error", error.message, "error");
//         }
//     };

//     return { loading, error, signup };
// };

// export default useSignUpWithEmailAndPassword;

>>>>>>> 1a52d2837d063d1dbc4df663c4ab2316e5f6c59b
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

        // ✅ Check if username already exists
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }

        try {
            // ✅ Create the user (Firebase auto logs in user at this step)
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser?.user) {
                showToast("Error", error?.message || "Signup failed", "error");
                return;
            }

            // ✅ Send email verification
            await sendEmailVerification(newUser.user);
            showToast("Success", "Verification email sent. Please check your inbox.", "success");

<<<<<<< HEAD
            // **🚀 Critical Fix:** Sign out immediately before UI updates
            await signOut(auth);

            // **🚀 Ensure instant UI switch:** Set login form **before** storing user in Firestore
            setIsLogin(true);

            // Create user document in Firestore **after** setting login state
=======
            // ✅ Store user data in Firestore
>>>>>>> 1a52d2837d063d1dbc4df663c4ab2316e5f6c59b
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
                emailVerified: false, // 🚀 New field to track verification
            };

            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

<<<<<<< HEAD
=======
            // 🚀 Forcefully log out user IMMEDIATELY
            await signOut(auth);

            // ✅ Prevent user from logging in until email is verified
            setIsLogin(true); // Switch to login page
            showToast("Info", "Please verify your email before logging in.", "info");

>>>>>>> 1a52d2837d063d1dbc4df663c4ab2316e5f6c59b
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
