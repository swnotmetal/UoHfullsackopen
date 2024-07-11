import axios from "axios";
import { DiaryType } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
    return axios
            .get<DiaryType[]>(baseUrl)
            .then(res => res.data)
};

/*export const inputNewDiary = (object: DiaryType) => {
    return axios
            .get<DiaryType>(baseUrl, object)
            .then(res => res.data)
};*/