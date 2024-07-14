import axios from "axios";
import { DiaryEntry} from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
    try {
        const response =  await axios.get<DiaryEntry[]>(baseUrl)
        return response.data;
    } catch (error) {
       if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log('%cerror flight-diary-frontend/src/services/diarySer.ts line:13 ', 'color: red; display: block; width: 100%;', error.response);
       }else{
        console.log('%cerror flight-diary-frontend/src/services/diarySer.ts line:15 ', 'color: red; display: block; width: 100%;', error);
       }
    }
};

export const inputNewDiary = async (object: DiaryEntry) => {
    try {
        const response =  await axios.post<DiaryEntry>(baseUrl, object)
        return response.data;
    } catch (error) {
       if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log('%cerror flight-diary-frontend/src/services/diarySer.ts line:13 ', 'color: red; display: block; width: 100%;', error.response);
       }else{
        console.log('%cerror flight-diary-frontend/src/services/diarySer.ts line:15 ', 'color: red; display: block; width: 100%;', error);
       }
    }
};