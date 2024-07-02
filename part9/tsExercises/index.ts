import express from 'express';
import exerciseCalculator from './exerciseCalculator';
import bmiCalculate from './bmiCalculator';


const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    res.send({ error: 'malformatted parameters' }).status(400);
}
  
  const bmi = bmiCalculate(weight, height);
  res.send({weight, height, bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reqbody = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExe : number [] = reqbody.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = Number(reqbody.target);


  
  if(!target || !dailyExe){
    res.status(400).send({ error: 'parameters missing' });
}
  if(isNaN(target) || dailyExe.some(isNaN)){
    res.status(400).send({ error: 'malformatted parameters' });
}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  try {
    const result = exerciseCalculator(dailyExe, target);
    return res.send({result}).status(200);
  } catch (error) {
    if(error instanceof Error){
      res.status(400).send({ error: error.message });
   }

   return res.status(400).send({ error: 'something went wrong' });
}

 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});