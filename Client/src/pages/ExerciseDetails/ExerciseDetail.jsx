import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../../components/Exercises/Detail';
import ExerciseVideos from '../../components/Exercises/ExerciseVideos';
import SimilarExercises from '../../components/Exercises/SimilarExercises';
import { RAPID_API_EXERCISE, RAPID_API_YOUTUBE } from '../../http/http';
import ExerciseService from '../../services/ExerciseServices';
import axios from 'axios';
import { exercisesConst } from '../../data/exercisesConst';

const ExerciseDetail = (props) => {
  const [exerciseDetail, setExerciseDetail] = useState();
  const [exerciseVideos, setExerciseVideos] = useState();
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();


  const [user, setUser] = useState(null)
  useEffect(() => {
    async function fetchUser() {
      try {
        if (!user) {
          const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
          setUser(resp.data)
        }
      } catch {
        setUser(null)
      }
    }
    fetchUser()
  }, [user])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      // const exerciseDetailData = await ExerciseService.fetchExerciseByValue(
      //   `${RAPID_API_EXERCISE}/exercises/exercise/${id}`,
      // );
      const exerciseDetailData = exercisesConst.find(e => e.id === id)
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await ExerciseService.fetchYouTubeVideo(
        `${RAPID_API_YOUTUBE}/search?query=${exerciseDetailData.name} упражнение`,
      );
      setExerciseVideos(exerciseVideosData.contents);

      // const targetMuscleExercisesData = await ExerciseService.fetchExerciseByValue(
      //   `${RAPID_API_EXERCISE}/exercises/target/${exerciseDetailData.target}`,
      // );
      const targetMuscleExercisesData = exercisesConst.filter(e => e.target === exerciseDetailData.target)
      setTargetMuscleExercises(targetMuscleExercisesData);
      console.log('targetMuscleExercisesData', targetMuscleExercisesData);
      // const equimentExercisesData = await ExerciseService.fetchExerciseByValue(
      //   `${RAPID_API_EXERCISE}/exercises/equipment/${exerciseDetailData.equipment}`,
      // );
      const equimentExercisesData = exercisesConst.filter(e => e.equipment === exerciseDetailData.equipment)
      setEquipmentExercises(equimentExercisesData);
      console.log('equimentExercisesData', equimentExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>Нет данных</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} showButton={!!user} userId = {user?.id}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
