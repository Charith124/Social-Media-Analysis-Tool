import { Box, Link, Tooltip } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io"; // Notification Bell Icon
import { Link as RouterLink } from "react-router-dom";

const Alerts = () => {
    return (
        <Tooltip
            hasArrow
            label={"Alerts & Notifications"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/alerts"} // Change this based on your routing
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
                <Box display={{ base: "none", md: "block" }}>Alerts</Box>
            </Link>
        </Tooltip>
    );
};

export default Alerts;
