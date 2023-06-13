import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import HeroBannerImage from '../../assets/exercises/images/banner.png';

const HeroBanner = () => {
  return (
    <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }} position="relative" p="20px">
      <Typography color="#FF2625" fontWeight="600" fontSize="26px">
        Фитнес тренировки
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '40px' } }}
        mb="23px"
        mt="30px">
        Тренируйся сегодня,
        <br /> чтобы побеждать завтра!
      </Typography>
      <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
        Просмотрите наиболее эффективные упражнения, отобранные специально для вас
      </Typography>
      <Stack>
        <a href="#exercises" className="exercise__link">
          Изучить Упражнения
        </a>
        <a href="#search" className="exercise__link">
          Поиск Упражнений
        </a>
      </Stack>
      <Typography
        fontWeight={600}
        color="#FF2625"
        sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}>
        Exercise
      </Typography>
      <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;
