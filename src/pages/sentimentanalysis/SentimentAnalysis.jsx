import React, { useState } from 'react';
import { Box, Button, Flex, Grid, Image, Select, Text } from '@chakra-ui/react';
import sentimentMainImage from "../../images/sentimentanalysis.png";

// Import all 20 sentiment images
import sentiment1 from '../../images/sentiment_images/1_sentiment_barplot.png';
import sentiment2 from '../../images/sentiment_images/2_sentiment_pie.png';
import sentiment3 from '../../images/sentiment_images/3_likes_lineplot.png';
import sentiment4 from '../../images/sentiment_images/4_sentiment_heatmap.png';
import sentiment5 from '../../images/sentiment_images/5_wordcloud_positive.png';
import sentiment6 from '../../images/sentiment_images/6_wordcloud_negative.png';
import sentiment7 from '../../images/sentiment_images/7_violin_likes_sentiment.png';
import sentiment8 from '../../images/sentiment_images/8_boxplot_comments_sentiment.png';   
import sentiment9 from '../../images/sentiment_images/9_scatter_likes_comments.png';
import sentiment10 from '../../images/sentiment_images/10_kde_shares_sentiment.png';
import sentiment11 from '../../images/sentiment_images/11_engagement_histogram.png';
import sentiment12 from '../../images/sentiment_images/12_top5_influencers_likes.png';
import sentiment13 from '../../images/sentiment_images/13_area_likes_comments.png';
import sentiment14 from '../../images/sentiment_images/14_stripplot_shares.png';
import sentiment15 from '../../images/sentiment_images/15_swarmplot_engagement.png';
import sentiment16 from '../../images/sentiment_images/16_trend_likes.png';
import sentiment17 from '../../images/sentiment_images/17_top5_sentiment_count.png';
import sentiment18 from '../../images/sentiment_images/18_avg_shares.png';
import sentiment19 from '../../images/sentiment_images/19_bubble_comments_likes.png';
import sentiment20 from '../../images/sentiment_images/20_wordcloud_mixed.png';

const sentimentImages = [
  { name: 'Sentiment Distribution', src: sentiment1 },
  { name: 'Sentiment Pie Chart', src: sentiment2 },
  { name: 'Average Likes Per Inluencerh', src: sentiment3 },
  { name: 'Heatmap of Likes', src: sentiment4 },
  { name: 'WordCloud Positive', src: sentiment5 },
  { name: 'WordCloud Negative', src: sentiment6 },
  { name: 'Violin Likes Sentiment', src: sentiment7 },
  { name: 'Comments Sentiment', src: sentiment8 },
  { name: 'Scatter Likes Comments', src: sentiment9 },
  { name: 'KDE Shares Sentiment', src: sentiment10 },
  { name: 'Engagement Histogram', src: sentiment11 },
  { name: 'Top5 Influencers Likes', src: sentiment12 },
  { name: 'Area Likes Comments', src: sentiment13 },
  { name: 'Stripplot Shares', src: sentiment14 },
  { name: 'Swarmplot Engagement', src: sentiment15 },
  { name: 'Trend Likes', src: sentiment16 },
  { name: 'Top5 Sentiment Count)', src: sentiment17 },
  { name: 'Avg Shares', src: sentiment18 },
  { name: 'Bubble Comments Likes', src: sentiment19 },
  { name: 'WordCloud Mixed', src: sentiment20 },
];

const SentimentAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState('All');
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (img) => {
    setExpandedImage(img);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <Box minH="100vh" bg="black" color="white" py={10} px={6} display="flex" flexDir="column" alignItems="center">
      <Text
        fontSize="6xl"
        fontWeight="extrabold"
        textAlign="center"
        mb={6}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          animation: 'typing 3.5s steps(40, end)',
        }}
      >
        SENTIMENT ANALYSIS
      </Text>

      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
        `}
      </style>

      <Text fontSize="2xl" color="gray.300" maxW="2xl" textAlign="center" mb={8} fontWeight="semibold">
        Analyze how your audience feels. Visualize sentiment trends, reactions, and engagement patterns across time, platforms, and demographics.
      </Text>

      <Image src={sentimentMainImage} alt="Sentiment Analysis" maxW="3xl" rounded="lg" shadow="lg" mb={8} />

      {/* Image Category Dropdown */}
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
          {sentimentImages.map((img) => (
            <option key={img.name} value={img.name}>
              {img.name}
            </option>
          ))}
        </Select>
      </Box>

      {/* Image Grid */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={10}>
        {sentimentImages
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

export default SentimentAnalysis;
