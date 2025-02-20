import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();

    const handleResetPassword = async () => {
        if (!email) {
            showToast("Error", "Please enter your email", "error");
            return;
        }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            showToast("Success", "Password reset email sent. Check your inbox.", "success");
            onBack(); // Navigate back to login form
        } catch (error) {
            showToast("Error", error.message, "error");
        }
        setLoading(false);
    };

    return (
        <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="white">Reset Password</Text>
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                colorScheme="blue"
                w="full"
                onClick={handleResetPassword}
                isLoading={loading}
            >
                Send Reset Link
            </Button>
            <Text
                fontSize="sm"
                color="blue.400"
                cursor="pointer"
                onClick={onBack}
            >
                Back to Login
            </Text>
        </VStack>
    );
};

export default ForgotPassword;