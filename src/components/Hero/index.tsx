import { useGetHeroBooksQuery } from '@/app/features/Hero/HeroApi';
import { Box } from '@chakra-ui/react'
import Slider from "react-slick";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  const { isLoading, data, isError, error } = useGetHeroBooksQuery()
  return (
    <Box p={4} bg={'whitesmoke'} boxShadow={"md"} height={'100dvh'}>
      <Box display={'flex'}>
        <Slider {...settings}>

        </Slider>
      </Box>
    </Box>
  )
}
