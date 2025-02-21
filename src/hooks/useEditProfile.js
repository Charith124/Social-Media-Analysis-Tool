import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const CLOUDINARY_CLOUD_NAME = "dadyig6km"; // Replace with your Cloudinary Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload"; // Replace with your Upload Preset

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);

        const userDocRef = doc(firestore, "users", authUser.uid);
        let profilePicURL = authUser.profilePicURL;

        try {
            if (selectedFile) {
                // Upload image to Cloudinary
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData,
                });

                const cloudinaryRes = await res.json();
                if (!cloudinaryRes.secure_url) throw new Error("Failed to upload image to Cloudinary");
                profilePicURL = cloudinaryRes.secure_url;
            }

            // Update Firestore with new profile data
            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;