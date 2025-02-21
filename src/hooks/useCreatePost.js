const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);

    const newPost = {
        caption: caption,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: authUser.uid,
    };

    try {
        // Upload image to Cloudinary
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", selectedFile);
        cloudinaryData.append("upload_preset", "unsigned_upload"); // Set your Cloudinary upload preset
        cloudinaryData.append("cloud_name", "dadyig6km");

        const res = await fetch("https://api.cloudinary.com/v1_1/dadyig6km/image/upload", {
            method: "POST",
            body: cloudinaryData,
        });

        const cloudinaryRes = await res.json();
        const imageURL = cloudinaryRes.secure_url; // Get Cloudinary image URL

        // Save post details to Firestore
        const postDocRef = await addDoc(collection(firestore, "posts"), { ...newPost, imageURL });
        const userDocRef = doc(firestore, "users", authUser.uid);

        await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

        newPost.imageURL = imageURL;

        if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });
        if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

        showToast("Success", "Post created successfully", "success");
    } catch (error) {
        showToast("Error", error.message, "error");
    } finally {
        setIsLoading(false);
    }
};