import express from 'express';
import diagnosesRouter from './routes/Drouter';
import patientsRouter from './routes/Prouter';
import cors from 'cors';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter );
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});