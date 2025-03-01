import React, { useState } from 'react';
import { Box, Button, Flex, Grid, Image, Select, Text } from '@chakra-ui/react';
import instagramImg from '../../images/instagramm.jpeg';
import twitterImg from '../../images/twitter.png';
import youtubeImg from '../../images/youtube.png';
import competitorAnalysisImg from '../../images/competitoranalysis.png';

// Import images for Instagram
import instagramTop10Influencers from '../../images/instagram/top10_influencers.png';
import instagramTop10Countries from '../../images/instagram/top10_countries.png';
import instagramTop10Engagement from '../../images/instagram/top10_engagement.png';
import instagramTop10Categories from '../../images/instagram/top10_categories.png';
import instagramTop10Audience from '../../images/instagram/top10_audience.png';
import instagramFollowersByCategory from '../../images/instagram/followers_by_category.png';
import instagramTop10AvgEngagement from '../../images/instagram/top10_avg_engagement.png';

// Import images for Twitter
import twitterTop3Subscribers from '../../images/twitter/top3_subscribers.png';
import twitterTop3ViewsAvg from '../../images/twitter/top3_views_avg.png';
import twitterTop3LikesAvg from '../../images/twitter/top3_likes_avg.png';
import twitterTop3CommentsAvg from '../../images/twitter/top3_comments_avg.png';
import twitterTop3SharesAvg from '../../images/twitter/top3_shares_avg.png';
import twitterTop3Influential from '../../images/twitter/top3_influential.png';

// Import images for YouTube
import youtubeMostOccurringCategories from '../../images/youtube/most_occurring_categories.png';
import youtubeTop10CategoriesSubscribers from '../../images/youtube/top10_categories_subscribers.png';
import youtubeTop5ChannelsSubscribers from '../../images/youtube/top5_channels_subscribers.png';
import youtubeTop5ChannelsViewers from '../../images/youtube/top5_channels_viewers.png';
import youtubeTop5ChannelsLikes from '../../images/youtube/top5_channels_likes.png';
import youtubeMostOccurringAudienceCountry from '../../images/youtube/most_occurring_audience_country.png';
import youtubeTop5CountriesMusicDance from '../../images/youtube/top5_countries_music_dance.png';
import youtubeTop5CountriesNewsPolitics from '../../images/youtube/top5_countries_news_politics.png';
import youtubeTop5CountriesVideoGames from '../../images/youtube/top5_countries_video_games.png';
import youtubeTop5CountriesAnimation from '../../images/youtube/top5_countries_animation.png';

const platformImages = {
  Instagram: [
    { name: 'Top 10 Influencers by Followers', src: instagramTop10Influencers },
    { name: 'Top 10 Audience Countries', src: instagramTop10Countries },
    { name: 'Top 10 Influencers and Engagement Metrics', src: instagramTop10Engagement },
    { name: 'Top 10 Categories by Engagement Metrics', src: instagramTop10Categories },
    { name: 'Top 10 Audience with Engagement Metrics', src: instagramTop10Audience },
    { name: 'Followers by Category and Audience Country', src: instagramFollowersByCategory },
    { name: 'Top 10 Categories by Engagement Average', src: instagramTop10AvgEngagement },
  ],
  Twitter: [
    { name: 'Top 3 Tiktokers with the most Subscribers', src: twitterTop3Subscribers },
    { name: 'Top 3 Tiktokers with the most views avg.', src: twitterTop3ViewsAvg },
    { name: 'Top 3 Tiktokers with the most Likes avg', src: twitterTop3LikesAvg },
    { name: 'Top 3 Tiktokers with the most Comments avg', src: twitterTop3CommentsAvg },
    { name: 'Top 3 Tiktokers with the most Shares avg', src: twitterTop3SharesAvg },
    { name: 'Top 3 Influential TikTokers', src: twitterTop3Influential },
  ],
  YouTube: [
    { name: 'Most occurring Categories', src: youtubeMostOccurringCategories },
    { name: 'Top 10 Categories by Subscribers', src: youtubeTop10CategoriesSubscribers },
    { name: 'Top 5 YouTube channels with the most Subscribers', src: youtubeTop5ChannelsSubscribers },
    { name: 'Top 5 YouTube channels with the most Viewers', src: youtubeTop5ChannelsViewers },
    { name: 'Top 5 YouTube channels with the most Likes', src: youtubeTop5ChannelsLikes },
    { name: 'Most occurring Audience Country', src: youtubeMostOccurringAudienceCountry },
    { name: 'Top 5 Countries in Music and Dance', src: youtubeTop5CountriesMusicDance },
    { name: 'Top 5 Countries in news and politics', src: youtubeTop5CountriesNewsPolitics },
    { name: 'Top 5 Countries in video games', src: youtubeTop5CountriesVideoGames },
    { name: 'Top 5 Countries in animation', src: youtubeTop5CountriesAnimation },
  ],
};

const CompetitorAnalysis = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedImage, setSelectedImage] = useState('All');
  const [expandedImage, setExpandedImage] = useState(null);

  const platforms = [
    { name: 'Instagram', image: instagramImg },
    { name: 'Twitter', image: twitterImg },
    { name: 'YouTube', image: youtubeImg },
  ];

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    setSelectedImage('All');
    setExpandedImage(null);
  };

  const handleImageClick = (img) => {
    setExpandedImage(img);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <Box minH="100vh" bg="black" color="white" py={10} px={6} display="flex" flexDir="column" alignItems="center">
      {/* Heading Text with Inline CSS Typing Effect (No Blinking Cursor) */}
      <Text
        fontSize="6xl"
        fontWeight="extrabold"
        textAlign="center"
        mb={6}
        style={{
          overflow: 'hidden', // Ensures the text is hidden until animated
          whiteSpace: 'nowrap', // Keeps the text on a single line
          animation: 'typing 3.5s steps(40, end)', // Typing animation only
        }}
      >
        COMPETITOR ANALYSIS
      </Text>

      {/* Add the keyframes for the typing effect */}
      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
        `}
      </style>

      <Text fontSize="2xl" color="gray.300" maxW="2xl" textAlign="center" mb={8} fontWeight="semibold">
        Explore competitor trends across various platforms. Select a platform to view insights into influencers, engagement metrics, audience demographics, and more.
      </Text>
      <Image src={competitorAnalysisImg} alt="Competitor Analysis" maxW="3xl" rounded="lg" shadow="lg" mb={8} />

      {/* Platform Buttons */}
      <Flex gap={6} mb={10}>
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            px={6}
            py={3}
            fontSize="lg"
            rounded="lg"
            transition="transform 0.2s"
            bg={selectedPlatform === platform.name ? 'blue.600' : 'gray.800'}
            _hover={{
              transform: 'scale(1.05)',
              bg: 'blue.500',
            }}
            onClick={() => handlePlatformChange(platform.name)}
          >
            {platform.name}
          </Button>
        ))}
      </Flex>

      {/* Image Selection Dropdown */}
      {selectedPlatform && (
        <Box w="full" maxW="3xl" bg="gray.900" p={6} rounded="lg" shadow="lg">
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Select Image Category
          </Text>
          <Select
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            w="full"
            p={3}
            rounded="lg"
            bg="gray.800"
            color="white"
            borderColor="gray.700"
          >
            <option value="All">All Images</option>
            {platformImages[selectedPlatform]?.map((img) => (
              <option key={img.name} value={img.name}>
                {img.name}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Image Grid */}
      {selectedPlatform && (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={10}>
          {platformImages[selectedPlatform]
            .filter((img) => selectedImage === 'All' || img.name === selectedImage)
            .map((img) => (
              <Box
                key={img.name}
                p={4}
                border="1px"
                borderColor="gray.700"
                rounded="lg"
                shadow="lg"
                bg="gray.800"
                _hover={{ transform: 'scale(1.05)' }}
                transition="transform 0.2s"
                onClick={() => handleImageClick(img)}
                cursor="pointer"
              >
                <Image src={img.src} alt={img.name} w="full" h={48} objectFit="cover" rounded="md" mb={4} />
                <Text textAlign="center" fontSize="lg" fontWeight="semibold">
                  {img.name}
                </Text>
              </Box>
            ))}
        </Grid>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.8)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
          onClick={handleCloseExpandedImage}
          cursor="pointer"
        >
          <Box maxW="90vw" maxH="90vh">
            <Image src={expandedImage.src} alt={expandedImage.name} w="full" h="full" objectFit="contain" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CompetitorAnalysis;