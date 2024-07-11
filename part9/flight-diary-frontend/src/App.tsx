import { useEffect, useState } from 'react'
import { DiaryType } from './types';
import { getAllDiaries } from './services/diarySer';

const App = () => {
  const [ diaryData, setDiaryData ] = useState<DiaryType[]>();

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaryData(data)
    })
  },[])

  /*const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setDiaryData({
      ...diaryData,
      [name]:value, 
    })
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(diaryData);
  
  }*/
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaryData?.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather condition: {diary.weather}</p>

        </div>
      )}
    </div>
  )
}

export default App;
