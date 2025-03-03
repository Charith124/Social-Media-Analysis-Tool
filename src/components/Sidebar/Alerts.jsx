import { Tooltip, Box, Link, Badge } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";

const Alerts = ({ alertCount }) => {
    return (
        <Tooltip hasArrow label={"Alerts & Notifications"} placement="right" ml={1} openDelay={500}>
            <Box>
                <Link
                    display={"flex"}
                    to={"/alerts"} // Redirects to the AlertsPage
                    as={RouterLink}
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                    <IoMdNotifications size={25} />
                    <Box display={{ base: "none", md: "block" }}>Alerts & Notifications</Box>
                    {alertCount > 0 && (
                        <Badge colorScheme="red" ml={2}>
                            {alertCount}
                        </Badge>
                    )}
                </Link>
            </Box>
        </Tooltip>
    );
};

export default Alerts;
