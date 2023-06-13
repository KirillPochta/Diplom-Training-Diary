import axios from 'axios';
import {
  allExerciseOptions,
  categoryExerciseOptions,
  exerciseByNameOptions,
  exerciseOptions,
  exerciseYouTubeVideo,
} from './../http/http';

export default class ExerciseService {
  static async fetchAllExercise() {
    try {
      const { data } = await axios.request(allExerciseOptions);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async fetchCategoryExercise() {
    try {
      const { data } = await axios.request(categoryExerciseOptions);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async fetchExerciseByName(url) {
    try {
      const res = await fetch(url, exerciseByNameOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async fetchExerciseByValue(url) {
    try {
      const res = await fetch(url, exerciseOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async fetchYouTubeVideo(url) {
    try {
      const res = await fetch(url, exerciseYouTubeVideo);
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
