import express from 'express'
import bmiCalculate from './bmiCalculator'

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    res.send({ error: 'malformatted parameters' }).status(400)
}
  
  const bmi = bmiCalculate(weight, height)
  res.send({weight, height, bmi})
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});