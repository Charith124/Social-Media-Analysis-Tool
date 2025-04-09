import React, { useState, useEffect } from "react";
import { 
  Box, Button, Flex, Select, Text, Spinner, 
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow,
  Grid, GridItem, VStack, HStack, Badge,
  Avatar, useColorModeValue
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaChartLine } from "react-icons/fa";

// Mock data with 20 realistic brands
// 
const mockBrands = {
  "brand1": { 
    id: "brand1", 
    name: "Nike", 
    engagement: ["1450000", "1580000", "1670000", "1820000"], // Realistic for a top athletic brand
    reach: ["7800000", "8200000", "8600000", "9100000"],     // High reach due to global presence
    likes: ["user1", "user2", "user3"],
    notes: "Strong performance in athletic wear category with consistent growth.",
    createdAt: "2023-01-15T10:30:00Z",
    lastUpdated: "2023-03-20T14:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign1",
        name: "Just Do It 2023",
        details: "Global brand campaign featuring top athletes",
        createdAt: "2023-02-10T09:15:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "Twitter", "YouTube"],
    logo: "https://logo.clearbit.com/nike.com"
  },
  "brand2": { 
    id: "brand2", 
    name: "Adidas", 
    engagement: ["1120000", "1240000", "1350000", "1490000"], // Slightly lower than Nike but competitive
    reach: ["6500000", "6900000", "7300000", "7700000"],      // Strong global reach
    likes: ["user2"],
    notes: "Growing engagement on Instagram with influencer partnerships.",
    createdAt: "2023-01-20T11:45:00Z",
    lastUpdated: "2023-03-15T16:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign2",
        name: "Impossible Is Nothing",
        details: "Celebrating women in sports",
        createdAt: "2023-03-01T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "YouTube", "TikTok"],
    logo: "https://logo.clearbit.com/adidas.com"
  },
  "brand3": { 
    id: "brand3", 
    name: "Apple", 
    engagement: ["3200000", "3450000", "3600000", "3900000"], // High due to tech fanbase
    reach: ["15000000", "15700000", "16300000", "17000000"], // Massive global reach
    likes: ["user1", "user3"],
    notes: "Consistent high engagement with product launches.",
    createdAt: "2023-02-05T13:20:00Z",
    lastUpdated: "2023-03-10T10:15:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign3",
        name: "iPhone 14 Launch",
        details: "Global launch campaign for new iPhone",
        createdAt: "2023-02-15T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Twitter", "YouTube", "Facebook"],
    logo: "https://logo.clearbit.com/apple.com"
  },
  "brand4": { 
    id: "brand4", 
    name: "Samsung", 
    engagement: ["2100000", "2250000", "2400000", "2600000"], // Competitive with Apple
    reach: ["11500000", "12000000", "12500000", "13000000"], // Strong reach in tech
    likes: ["user2", "user3"],
    notes: "Strong performance in Asian markets.",
    createdAt: "2023-01-25T09:15:00Z",
    lastUpdated: "2023-03-18T11:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign4",
        name: "Galaxy S23 Series",
        details: "Flagship smartphone launch campaign",
        createdAt: "2023-02-20T08:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "YouTube", "Facebook", "TikTok"],
    logo: "https://logo.clearbit.com/samsung.com"
  },
  "brand5": { 
    id: "brand5", 
    name: "Coca-Cola", 
    engagement: ["2400000", "2550000", "2700000", "2900000"], // High for a beverage giant
    reach: ["18000000", "18500000", "19000000", "19500000"], // Massive global reach
    likes: ["user1", "user2", "user3"],
    notes: "Consistent global engagement with seasonal campaigns.",
    createdAt: "2023-01-10T08:45:00Z",
    lastUpdated: "2023-03-22T10:15:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign5",
        name: "Share a Coke 2023",
        details: "Personalized bottle campaign",
        createdAt: "2023-03-01T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "Twitter", "YouTube"],
    logo: "https://logo.clearbit.com/coca-cola.com"
  },
  "brand6": { 
    id: "brand6", 
    name: "Netflix", 
    engagement: ["3500000", "3700000", "3900000", "4100000"], // High due to content releases
    reach: ["20000000", "20500000", "21000000", "21500000"], // Huge streaming audience
    likes: ["user1"],
    notes: "High engagement around new show releases.",
    createdAt: "2023-02-08T14:30:00Z",
    lastUpdated: "2023-03-19T16:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign6",
        name: "Stranger Things Season 4",
        details: "Promotion for new season",
        createdAt: "2023-03-10T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Twitter", "YouTube", "TikTok"],
    logo: "https://logo.clearbit.com/netflix.com"
  },
  "brand7": { 
    id: "brand7", 
    name: "Amazon", 
    engagement: ["2800000", "3000000", "3200000", "3400000"], // High due to e-commerce scale
    reach: ["23000000", "23500000", "24000000", "24500000"], // Massive reach
    likes: ["user2", "user3"],
    notes: "Prime Day campaigns drive significant spikes.",
    createdAt: "2023-01-18T11:20:00Z",
    lastUpdated: "2023-03-17T14:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign7",
        name: "Prime Day 2023",
        details: "Annual shopping event promotion",
        createdAt: "2023-03-05T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "Twitter", "YouTube"],
    logo: "https://logo.clearbit.com/amazon.com"
  },
  "brand8": { 
    id: "brand8", 
    name: "Tesla", 
    engagement: ["2000000", "2200000", "2350000", "2500000"], // Boosted by Elon’s influence
    reach: ["14000000", "14500000", "15000000", "15500000"], // Strong tech/automotive reach
    likes: ["user1", "user3"],
    notes: "Elon Musk's tweets significantly impact engagement.",
    createdAt: "2023-02-12T10:15:00Z",
    lastUpdated: "2023-03-21T11:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign8",
        name: "Cybertruck Launch",
        details: "Promoting the new vehicle launch",
        createdAt: "2023-03-15T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Twitter", "Instagram", "YouTube"],
    logo: "https://logo.clearbit.com/tesla.com"
  },
  "brand9": { 
    id: "brand9", 
    name: "Starbucks", 
    engagement: ["1700000", "1850000", "1950000", "2100000"], // Seasonal spikes
    reach: ["11000000", "11500000", "12000000", "12500000"], // Large coffee chain reach
    likes: ["user1", "user2"],
    notes: "Seasonal drinks drive engagement spikes.",
    createdAt: "2023-01-22T09:30:00Z",
    lastUpdated: "2023-03-16T15:20:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign9",
        name: "Pumpkin Spice Season",
        details: "Fall seasonal menu promotion",
        createdAt: "2023-03-01T08:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "TikTok"],
    logo: "https://logo.clearbit.com/starbucks.com"
  },
  "brand10": { 
    id: "brand10", 
    name: "McDonald's", 
    engagement: ["2500000", "2650000", "2800000", "3000000"], // High for fast food
    reach: ["17000000", "17500000", "18000000", "18500000"], // Huge global reach
    likes: ["user2"],
    notes: "Strong engagement with limited-time offers.",
    createdAt: "2023-01-28T10:45:00Z",
    lastUpdated: "2023-03-20T12:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign10",
        name: "McRib Comeback",
        details: "Limited-time product return campaign",
        createdAt: "2023-03-10T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Twitter", "Facebook", "TikTok"],
    logo: "https://logo.clearbit.com/mcdonalds.com"
  },
  "brand11": { 
    id: "brand11", 
    name: "Gucci", 
    engagement: ["1050000", "1150000", "1250000", "1350000"], // Luxury brand, smaller but engaged audience
    reach: ["7000000", "7300000", "7600000", "7900000"],     // High-end reach
    likes: ["user1", "user3"],
    notes: "Luxury fashion with high influencer engagement.",
    createdAt: "2023-02-15T11:20:00Z",
    lastUpdated: "2023-03-19T14:15:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign11",
        name: "Gucci Ancora",
        details: "New collection launch",
        createdAt: "2023-03-12T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "TikTok"],
    logo: "https://logo.clearbit.com/gucci.com"
  },
  "brand12": { 
    id: "brand12", 
    name: "Disney", 
    engagement: ["3100000", "3300000", "3500000", "3700000"], // High due to movies
    reach: ["20000000", "20500000", "21000000", "21500000"], // Massive entertainment reach
    likes: ["user1", "user2"],
    notes: "Movie releases drive significant engagement.",
    createdAt: "2023-01-30T09:45:00Z",
    lastUpdated: "2023-03-21T13:20:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign12",
        name: "The Little Mermaid",
        details: "Live action movie promotion",
        createdAt: "2023-03-05T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Twitter", "YouTube", "TikTok"],
    logo: "https://logo.clearbit.com/disney.com"
  },
  "brand13": { 
    id: "brand13", 
    name: "Spotify", 
    engagement: ["2200000", "2350000", "2500000", "2700000"], // Strong music platform engagement
    reach: ["14000000", "14500000", "15000000", "15500000"], // Large streaming reach
    likes: ["user3"],
    notes: "Wrapped campaign drives annual engagement peak.",
    createdAt: "2023-02-10T10:30:00Z",
    lastUpdated: "2023-03-18T15:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign13",
        name: "Equal Global Music Program",
        details: "Promoting gender equality in music",
        createdAt: "2023-03-08T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Twitter", "TikTok"],
    logo: "https://logo.clearbit.com/spotify.com"
  },
  "brand14": { 
    id: "brand14", 
    name: "Airbnb", 
    engagement: ["1400000", "1500000", "1600000", "1700000"], // Travel-related engagement
    reach: ["9500000", "9800000", "10100000", "10400000"],   // Solid reach for travel
    likes: ["user1", "user2"],
    notes: "Travel seasonality affects engagement.",
    createdAt: "2023-02-05T14:15:00Z",
    lastUpdated: "2023-03-17T12:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign14",
        name: "Live Anywhere",
        details: "Promoting long-term stays",
        createdAt: "2023-03-10T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "YouTube"],
    logo: "https://logo.clearbit.com/airbnb.com"
  },
  "brand15": { 
    id: "brand15", 
    name: "Uber", 
    engagement: ["950000", "1050000", "1150000", "1250000"],  // Mobility service engagement
    reach: ["8000000", "8300000", "8600000", "8900000"],     // Urban-focused reach
    likes: ["user2"],
    notes: "Engagement peaks during holidays.",
    createdAt: "2023-02-18T11:45:00Z",
    lastUpdated: "2023-03-20T14:15:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign15",
        name: "Uber One",
        details: "Membership program promotion",
        createdAt: "2023-03-12T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Twitter", "Instagram", "Facebook"],
    logo: "https://logo.clearbit.com/uber.com"
  },
  "brand16": { 
    id: "brand16", 
    name: "Zara", 
    engagement: ["1250000", "1350000", "1450000", "1550000"], // Fast fashion engagement
    reach: ["8500000", "8800000", "9100000", "9400000"],     // Strong retail reach
    likes: ["user1", "user3"],
    notes: "Fast fashion with frequent collection updates.",
    createdAt: "2023-02-22T10:20:00Z",
    lastUpdated: "2023-03-19T13:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign16",
        name: "Spring Collection",
        details: "New season fashion line",
        createdAt: "2023-03-01T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "TikTok"],
    logo: "https://logo.clearbit.com/zara.com"
  },
  "brand17": { 
    id: "brand17", 
    name: "Lego", 
    engagement: ["1050000", "1150000", "1250000", "1350000"], // Niche but engaged fanbase
    reach: ["7000000", "7300000", "7600000", "7900000"],     // Solid toy brand reach
    likes: ["user1", "user2"],
    notes: "Strong engagement with fan communities.",
    createdAt: "2023-02-14T09:30:00Z",
    lastUpdated: "2023-03-18T11:20:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign17",
        name: "Lego Star Wars",
        details: "New Star Wars set releases",
        createdAt: "2023-03-05T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "YouTube", "Facebook"],
    logo: "https://logo.clearbit.com/lego.com"
  },
  "brand18": { 
    id: "brand18", 
    name: "Red Bull", 
    engagement: ["2000000", "2150000", "2300000", "2450000"], // High for extreme sports
    reach: ["14000000", "14500000", "15000000", "15500000"], // Strong sports reach
    likes: ["user3"],
    notes: "Extreme sports content drives engagement.",
    createdAt: "2023-02-08T14:45:00Z",
    lastUpdated: "2023-03-21T15:30:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign18",
        name: "Red Bull Stratos",
        details: "Extreme sports event coverage",
        createdAt: "2023-03-15T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["YouTube", "Instagram", "Twitter"],
    logo: "https://logo.clearbit.com/redbull.com"
  },
  "brand19": { 
    id: "brand19", 
    name: "Dove", 
    engagement: ["1400000", "1500000", "1600000", "1700000"], // Solid for personal care
    reach: ["9500000", "9800000", "10100000", "10400000"],   // Broad consumer reach
    likes: ["user1", "user2"],
    notes: "Body positivity campaigns perform well.",
    createdAt: "2023-02-20T10:15:00Z",
    lastUpdated: "2023-03-17T14:45:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign19",
        name: "Real Beauty",
        details: "Body positivity campaign",
        createdAt: "2023-03-08T09:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Instagram", "Facebook", "YouTube"],
    logo: "https://logo.clearbit.com/dove.com"
  },
  "brand20": { 
    id: "brand20", 
    name: "PlayStation", 
    engagement: ["2500000", "2650000", "2800000", "3000000"], // High for gaming
    reach: ["17000000", "17500000", "18000000", "18500000"], // Large gaming audience
    likes: ["user1", "user3"],
    notes: "Game launches drive engagement spikes.",
    createdAt: "2023-02-25T11:30:00Z",
    lastUpdated: "2023-03-22T16:15:00Z",
    createdBy: "user1",
    campaigns: [
      {
        id: "campaign20",
        name: "PS5 Exclusive Launch",
        details: "New game release promotion",
        createdAt: "2023-03-10T10:00:00Z",
        status: "active"
      }
    ],
    platforms: ["Twitter", "YouTube", "Instagram"],
    logo: "https://logo.clearbit.com/playstation.com"
  }
};

// Mock current user
const mockUser = {
  uid: "user1",
  displayName: "John Doe",
  email: "john@example.com"
};

const MultiBrandManagement = () => {
  // State Management
  const [brands, setBrands] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState(null);
  
  // Mock auth user
  const authUser = mockUser;
  
  // Load brands (simulating Firestore fetch)
  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setBrands(mockBrands);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Load performance data when a brand is selected
  useEffect(() => {
    if (selectedBrand && brands[selectedBrand]) {
      setPerformanceData(brands[selectedBrand]);
    } else {
      setPerformanceData(null);
    }
  }, [selectedBrand, brands]);

  // Like/Unlike a brand (frontend-only mock)
  const handleLikeBrand = (brand) => {
    const userLiked = brand.likes.includes(authUser.uid);
    let updatedLikes;
    
    if (userLiked) {
      // Remove user from likes
      updatedLikes = brand.likes.filter(uid => uid !== authUser.uid);
    } else {
      // Add user to likes
      updatedLikes = [...brand.likes, authUser.uid];
    }
    
    // Update brands state
    setBrands(prev => ({
      ...prev,
      [brand.id]: {
        ...prev[brand.id],
        likes: updatedLikes
      }
    }));
  };

  // Calculate percentage change for metrics
  const calculateChange = (data = []) => {
    if (data.length < 2) return { value: 0, type: "increase" };
    
    const current = parseFloat(data[data.length - 1]);
    const previous = parseFloat(data[data.length - 2]);
    
    if (isNaN(current) || isNaN(previous) || previous === 0) return { value: 0, type: "increase" };
    
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      type: change >= 0 ? "increase" : "decrease"
    };
  };

  // Format large numbers
  const formatNumber = (num) => {
    if (!num) return "0";
    return parseFloat(num).toLocaleString();
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.900", "gray.800")} color="white" py={10} px={6} display="flex" flexDir="column" alignItems="center">
      <Box maxW="7xl" w="full">
        <Text 
          fontSize={{ base: "4xl", md: "6xl" }} 
          fontWeight="extrabold" 
          textAlign="center" 
          mb={6}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          MULTI-BRAND MANAGEMENT
        </Text>

        <Text 
          fontSize={{ base: "xl", md: "2xl" }} 
          color="gray.300" 
          maxW="2xl" 
          textAlign="center" 
          mb={8} 
          fontWeight="semibold"
          mx="auto"
        >
          View and analyze social media performance for top brands.
        </Text>

        {loading ? (
          <Flex justify="center">
            <Spinner size="xl" color="blue.400" />
          </Flex>
        ) : (
          <>
            <Box w="full" bg={useColorModeValue("gray.800", "gray.700")} p={6} rounded="lg" shadow="xl" mb={8}>
              <Text fontSize="xl" fontWeight="semibold" mb={4}>Select a Brand</Text>
              
              <Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                w="full"
                p={3}
                rounded="lg"
                bg={useColorModeValue("gray.700", "gray.600")}
                color="white"
                borderColor="gray.600"
                _hover={{ borderColor: "blue.500" }}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              >
                <option value="">Select a brand</option>
                {Object.values(brands).map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            </Box>

            {selectedBrand && brands[selectedBrand] && performanceData && (
              <Box 
                mt={6} 
                p={6} 
                w="full" 
                bg={useColorModeValue("gray.800", "gray.700")} 
                rounded="lg" 
                shadow="xl"
                border="1px solid"
                borderColor={useColorModeValue("gray.700", "gray.600")}
              >
                <Tabs variant="soft-rounded" colorScheme="blue">
                  <TabList mb={6} flexWrap="wrap">
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Overview</Tab>
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Performance</Tab>
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Campaigns</Tab>
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Platforms</Tab>
                  </TabList>
                  
                  <TabPanels>
                    {/* Overview Tab */}
                    <TabPanel>
                      <VStack align="start" spacing={6}>
                        <Flex justifyContent="space-between" w="full" align="center">
                          <HStack>
                            {performanceData.logo && (
                              <Avatar src={performanceData.logo} name={performanceData.name} size="lg" />
                            )}
                            <Text fontSize="2xl" fontWeight="bold">{brands[selectedBrand].name}</Text>
                          </HStack>
                          <Button
                            onClick={() => handleLikeBrand(brands[selectedBrand])}
                            leftIcon={brands[selectedBrand].likes.includes(authUser?.uid) ? <FaHeart color="red" /> : <FaRegHeart />}
                            variant="outline"
                            colorScheme={brands[selectedBrand].likes.includes(authUser?.uid) ? "red" : "blue"}
                            _hover={{ bg: brands[selectedBrand].likes.includes(authUser?.uid) ? "red.900" : "blue.900" }}
                          >
                            {brands[selectedBrand].likes.length}
                          </Button>
                        </Flex>
                        
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                          <GridItem>
                            <Stat p={4} bg={useColorModeValue("gray.700", "gray.600")} rounded="lg">
                              <StatLabel color="gray.300">Engagement</StatLabel>
                              <StatNumber color="blue.300">
                                {performanceData.engagement.length > 0 
                                  ? formatNumber(performanceData.engagement[performanceData.engagement.length - 1]) 
                                  : "N/A"}
                              </StatNumber>
                              {performanceData.engagement.length > 1 && (
                                <StatHelpText>
                                  <StatArrow type={calculateChange(performanceData.engagement).type} />
                                  {calculateChange(performanceData.engagement).value}%
                                </StatHelpText>
                              )}
                            </Stat>
                          </GridItem>
                          
                          <GridItem>
                            <Stat p={4} bg={useColorModeValue("gray.700", "gray.600")} rounded="lg">
                              <StatLabel color="gray.300">Reach</StatLabel>
                              <StatNumber color="green.300">
                                {performanceData.reach.length > 0 
                                  ? formatNumber(performanceData.reach[performanceData.reach.length - 1]) 
                                  : "N/A"}
                              </StatNumber>
                              {performanceData.reach.length > 1 && (
                                <StatHelpText>
                                  <StatArrow type={calculateChange(performanceData.reach).type} />
                                  {calculateChange(performanceData.reach).value}%
                                </StatHelpText>
                              )}
                            </Stat>
                          </GridItem>
                        </Grid>
                        
                        <Box w="full">
                          <Text fontWeight="semibold" mb={2}>Notes</Text>
                          <Box p={4} bg={useColorModeValue("gray.700", "gray.600")} rounded="md" minH="100px">
                            {performanceData.notes || "No notes available"}
                          </Box>
                        </Box>
                        
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
                          {performanceData.createdAt && (
                            <GridItem>
                              <Text color="gray.400" fontSize="sm">
                                Created: {new Date(performanceData.createdAt).toLocaleDateString()}
                              </Text>
                            </GridItem>
                          )}
                          
                          {performanceData.lastUpdated && (
                            <GridItem>
                              <Text color="gray.400" fontSize="sm">
                                Last Updated: {new Date(performanceData.lastUpdated).toLocaleDateString()}
                              </Text>
                            </GridItem>
                          )}
                        </Grid>
                      </VStack>
                    </TabPanel>
                    
                    {/* Performance Tab */}
                    <TabPanel>
                      <VStack align="start" spacing={6} w="full">
                        <Text fontSize="xl" fontWeight="semibold">Historical Data</Text>
                        
                        <Box w="full">
                          <Text fontWeight="semibold" mb={2}>Engagement Trend</Text>
                          <Box p={4} bg={useColorModeValue("gray.700", "gray.600")} rounded="lg">
                            <HStack spacing={3} h="200px" align="flex-end">
                              {performanceData.engagement.map((value, index) => {
                                const height = performanceData.engagement.length > 0 
                                  ? `${Math.max(10, (value / Math.max(...performanceData.engagement.map(v => parseFloat(v)))) * 180)}px` 
                                  : "10px";
                                return (
                                  <VStack key={index} h="full" justify="flex-end" flex={1}>
                                    <Box
                                      h={height}
                                      w="full"
                                      bgGradient="linear(to-t, blue.400, blue.600)"
                                      borderTopRadius="md"
                                      position="relative"
                                      boxShadow="md"
                                    >
                                      <Text 
                                        position="absolute" 
                                        top="-25px" 
                                        left="50%" 
                                        transform="translateX(-50%)"
                                        fontSize="xs"
                                        color="white"
                                      >
                                        {formatNumber(value)}
                                      </Text>
                                    </Box>
                                    <Text fontSize="xs" color="gray.400">
                                      Month {index + 1}
                                    </Text>
                                  </VStack>
                                );
                              })}
                            </HStack>
                          </Box>
                        </Box>
                        
                        <Box w="full">
                          <Text fontWeight="semibold" mb={2}>Reach Trend</Text>
                          <Box p={4} bg={useColorModeValue("gray.700", "gray.600")} rounded="lg">
                            <HStack spacing={3} h="200px" align="flex-end">
                              {performanceData.reach.map((value, index) => {
                                const height = performanceData.reach.length > 0 
                                  ? `${Math.max(10, (value / Math.max(...performanceData.reach.map(v => parseFloat(v)))) * 180)}px` 
                                  : "10px";
                                return (
                                  <VStack key={index} h="full" justify="flex-end" flex={1}>
                                    <Box
                                      h={height}
                                      w="full"
                                      bgGradient="linear(to-t, green.400, green.600)"
                                      borderTopRadius="md"
                                      position="relative"
                                      boxShadow="md"
                                    >
                                      <Text 
                                        position="absolute" 
                                        top="-25px" 
                                        left="50%" 
                                        transform="translateX(-50%)"
                                        fontSize="xs"
                                        color="white"
                                      >
                                        {formatNumber(value)}
                                      </Text>
                                    </Box>
                                    <Text fontSize="xs" color="gray.400">
                                      Month {index + 1}
                                    </Text>
                                  </VStack>
                                );
                              })}
                            </HStack>
                          </Box>
                        </Box>
                      </VStack>
                    </TabPanel>
                    
                    {/* Campaigns Tab */}
                    <TabPanel>
                      <VStack align="start" spacing={6} w="full">
                        <Text fontSize="xl" fontWeight="semibold">Campaigns</Text>
                        
                        {performanceData.campaigns && performanceData.campaigns.length > 0 ? (
                          <VStack spacing={4} w="full">
                            {performanceData.campaigns.map((campaign) => (
                              <Box 
                                key={campaign.id} 
                                p={4} 
                                bg={useColorModeValue("gray.700", "gray.600")} 
                                rounded="md" 
                                w="full"
                                border="1px solid"
                                borderColor={useColorModeValue("gray.600", "gray.500")}
                                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                                transition="all 0.2s"
                              >
                                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                                  <Text fontWeight="semibold">{campaign.name}</Text>
                                  <Badge 
                                    colorScheme={campaign.status === "active" ? "green" : "gray"}
                                    variant="subtle"
                                  >
                                    {campaign.status}
                                  </Badge>
                                </Flex>
                                <Text fontSize="sm" color="gray.400">{campaign.details}</Text>
                                <Text fontSize="xs" mt={2} color="gray.500">
                                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        ) : (
                          <Box 
                            p={6} 
                            bg={useColorModeValue("gray.700", "gray.600")} 
                            rounded="md" 
                            w="full" 
                            textAlign="center"
                            border="1px dashed"
                            borderColor="gray.500"
                          >
                            <Text color="gray.400">No campaigns available</Text>
                          </Box>
                        )}
                      </VStack>
                    </TabPanel>
                    
                    {/* Platforms Tab */}
                    <TabPanel>
                      <VStack align="start" spacing={6} w="full">
                        <Text fontSize="xl" fontWeight="semibold">Social Platforms</Text>
                        
                        {performanceData.platforms && performanceData.platforms.length > 0 ? (
                          <Grid 
                            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} 
                            gap={4} 
                            w="full"
                          >
                            {performanceData.platforms.map((platform) => (
                              <GridItem 
                                key={platform}
                                p={4}
                                bg={useColorModeValue("gray.700", "gray.600")}
                                rounded="md"
                                textAlign="center"
                                border="1px solid"
                                borderColor={useColorModeValue("gray.600", "gray.500")}
                                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                                transition="all 0.2s"
                              >
                                <Text fontWeight="semibold">{platform}</Text>
                              </GridItem>
                            ))}
                          </Grid>
                        ) : (
                          <Box 
                            p={6} 
                            bg={useColorModeValue("gray.700", "gray.600")} 
                            rounded="md" 
                            w="full" 
                            textAlign="center"
                            border="1px dashed"
                            borderColor="gray.500"
                          >
                            <Text color="gray.400">No platforms available</Text>
                          </Box>
                        )}
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MultiBrandManagement;