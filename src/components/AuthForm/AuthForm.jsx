import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo.png' h={24} cursor={"pointer"} alt='CSVISTA' />

                    {isForgotPassword ? (
                        <ForgotPassword onBack={() => setIsForgotPassword(false)} />
                    ) : isLogin ? (
                        <Login setIsLogin={setIsLogin} /> 
                    ) : (
                        <Signup setIsLogin={setIsLogin} /> 
                    )}

                    {/* ---------------- OR -------------- */}
                    {!isForgotPassword && (
                        <>
                            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                                <Box flex={2} h={"1px"} bg={"gray.400"} />
                                <Text mx={1} color={"white"}>OR</Text>
                                <Box flex={2} h={"1px"} bg={"gray.400"} />
                            </Flex>

                            <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />

                            {/* Forgot Password Link */}
                            {isLogin && (
                                <Text
                                    fontSize="sm"
                                    color="blue.400"
                                    cursor="pointer"
                                    onClick={() => setIsForgotPassword(true)}
                                    textAlign="center"
                                >
                                    Forgot password?
                                </Text>
                            )}
                        </>
                    )}
                </VStack>
            </Box>

            {!isForgotPassword && (
                <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                    <Flex alignItems={"center"} justifyContent={"center"}>
                        <Box mx={2} fontSize={14}>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </Box>
                        <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                            {isLogin ? "Sign up" : "Log in"}
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    );
};

export default AuthForm;