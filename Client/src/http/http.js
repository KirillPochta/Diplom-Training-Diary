import axios from 'axios';

export const API_URL = './';
export const RAPID_API_EXERCISE = 'https://exercisedb.p.rapidapi.com';
export const RAPID_API_YOUTUBE = 'https://youtube-search-and-download.p.rapidapi.com';
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
export default $api;

export const exerciseOptions = {
  method: 'GET',
  url: `${RAPID_API_EXERCISE}`,
  headers: {
    'X-RapidAPI-Key': '329c8714famshe350f16b5ed4a55p1fbed6jsnf6c8c1aaf991',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const allExerciseOptions = {
  method: 'GET',
  url: `${RAPID_API_EXERCISE}/exercises`,
  headers: {
    'X-RapidAPI-Key': '329c8714famshe350f16b5ed4a55p1fbed6jsnf6c8c1aaf991',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const categoryExerciseOptions = {
  method: 'GET',
  url: `${RAPID_API_EXERCISE}/exercises/bodyPartList`,
  headers: {
    'X-RapidAPI-Key': '329c8714famshe350f16b5ed4a55p1fbed6jsnf6c8c1aaf991',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const exerciseByNameOptions = {
  method: 'GET',
  url: `${RAPID_API_EXERCISE}/exercises/bodyPart`,
  headers: {
    'X-RapidAPI-Key': '329c8714famshe350f16b5ed4a55p1fbed6jsnf6c8c1aaf991',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const exerciseYouTubeVideo = {
  method: 'GET',
  url: 'https://youtube-search-and-download.p.rapidapi.com/video/related',
  params: {
    id: 'YQHsXMglC9A',
    hl: 'en',
    gl: 'US',
    next: 'CBQSDRILWVFIc1hNZ2xDOUEYACreAQjQr43tubfzi64BCNi24eOapu-n7AEIgejpz9fcuPajAQjwqMe8v7SEuJ0BCI3CwqDWu4nahAEItNrrwNnAzuQ1CK6-ooCH-Jj5JAik8O-ahq3L1sYBCMb965f10YS4UwiNkaXwtL_gzi4I1vOMu5f7r4HeAQjEuYHvqNfimgwIzvHK75mt1Z27AQjw_7n5yaLZ3_UBCJOq5eCOo-XS_QEIocGSnpeajIsXCN2F2tj65L_4zwEI4KbhwtjP98duCI_C_IbhttbzTAi2gO-y3KbjuZgBCNbN7-m31YCKVmoPd2F0Y2gtbmV4dC1mZWVk',
  },
  headers: {
    'X-RapidAPI-Key': '329c8714famshe350f16b5ed4a55p1fbed6jsnf6c8c1aaf991',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};
