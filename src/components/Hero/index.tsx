import { useGetHeroBooksQuery } from '@/app/features/Hero/HeroApi';
import { Box, Heading, Image, Spinner, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  arrows: false
};
export default function Hero() {
  const navigate = useNavigate();
  const { isLoading, data: heroData, isError, error } = useGetHeroBooksQuery();
  console.log({
    isError, error, heroData
  });

  let contentToRender = null;

  if (isLoading && !heroData) {
    contentToRender = <Box display={'flex'} justifyContent={'center'} p={5}><Spinner /></Box>
  }
  if (!isLoading && isError && 'error' in error) {
    contentToRender = <p>{error.error}</p>
  }
  if (!isLoading && heroData) {
    contentToRender = <Box>
      <Heading textAlign='center' p='5'>Trending Books</Heading>
      <Slider {...settings}>
        {heroData.data.map((book) => (
          <Box position={'relative'} margin={'5px'} className='hero-item' height={'80dvh'} key={book.title} border={'2px solid brown'}>
            <Text onClick={() => navigate(`/bookDetail/${book._id}`)} background={'blackAlpha.900'} cursor={'pointer'} fontSize={'20px'} m={'100% 0'} textAlign={'center'} p={'5'} color={'white'} position={'absolute'} width={'100%'} > {book.title} - {book.author} </Text>
            <Image src={book.coverImage} height='100%' width='100%' />
          </Box>
        ))}
      </Slider>
    </Box>
  }
  return (
    <Box height={'100dvh'}>
      <Box>
        {contentToRender}
      </Box>
    </Box>
  )
}
