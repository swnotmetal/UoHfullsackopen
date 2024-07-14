import { useEffect, useState, ChangeEvent } from 'react';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, inputNewDiary } from './services/diarySer';

const App = () => {
 const [diaries, setDiaries] =useState<DiaryEntry[]>([]);
 //const [newDiary, setNewDiary] = useState('');
 const [date, setDate] = useState('');
 const [weather, setWeather] = useState(Weather.Sunny)
 const [visibility, setVisibility] = useState(Visibility.Good)
 const [comment, setComment] = useState('');

 useEffect(() => {
  getAllDiaries().then(data => {
    console.log('Fetched diaries:', data)
    const uniqueData = data.filter((diary, index, self) => 
      index === self.findIndex((d) => d.id === diary.id)
    );
    setDiaries(uniqueData);
  }).catch(error => {
    console.error('Error fetching diaries:', error);
  });
}, []);
useEffect(() => {
  console.log('Diaries state updated:', diaries);
}, [diaries]);
const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  setDate(e.target.value);
};

const handleWeatherChange = (e: ChangeEvent<HTMLSelectElement>) => {
  setWeather(e.target.value as Weather);
};

const handleVisibilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
  setVisibility(e.target.value as Visibility);
};

const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
  setComment(e.target.value);
};

const diaryCreation = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  const newEntry: NewDiaryEntry = {date, weather, visibility, comment};
  console.log('what is being send:', newEntry);
  try {
    const data = await inputNewDiary(newEntry);
    console.log('server res:', data);
    setDiaries(prevDiaries => [...prevDiaries, data]);
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Good);
    setComment('');
  } catch (error) {
    console.error('Error submitting diary:', error);
  }
};


  return (
    <div>
      <form onSubmit={diaryCreation} >
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id='date' value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="weather">Weather:</label>
          <select value={weather} id="weather" onChange={handleWeatherChange}>
            {Object.values(Weather).map(wO => (
              <option value={wO} key={wO}>{wO}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          <select value={visibility} id="visibility" onChange={handleVisibilityChange}>
          {Object.values(Visibility).map(vO => (
              <option value={vO} key={vO}>{vO}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input type="comment" id='comment' value={comment} onChange={handleCommentChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    <h1>Diary Entries</h1>
    {diaries.map(diary => (
  <div key={diary.id}>
    <h3>{diary.date}</h3>
    <p>visibility: {diary.visibility}</p>
    <p>weather: {diary.weather}</p>
  </div>
))}
  </div>
  );
}

export default App;
