import React, {useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import HorizontalScrollbar from './HorizontalScrollbar';
import ExerciseService from './../../services/ExerciseServices';
import { bodyPartsConst } from '../../data/bodyPartsConst';
import { exercisesConst } from '../../data/exercisesConst';

const SearchExercises = ({
  bodyPart,
  setExercises,
  setBodyPart,
  exercises,
}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState(['']);

  useEffect(() => {
    const fetchExercisesData = async () => {
      //const bodyPartsData = await ExerciseService.fetchCategoryExercise();
      const bodyPartsData = bodyPartsConst
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      //const exercisesData = await ExerciseService.fetchAllExercise();
      const exercisesData = exercisesConst

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack id="search" alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center">
        Отличные Упражнения
        <br /> Которые Вам Следует Знать
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },

            backgroundColor: '#fff',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Поиск упражнений"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            position: 'absolute',
            right: '0px',
            fontSize: { lg: '20px', xs: '14px' },
          }}
          onClick={handleSearch}>
          Поиск
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
          exercises={exercises}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
