/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import appService from '../services/appService';

const router = express.Router();


router.get('/', (_req, res) => {
  res.send(appService.getNonsensitivePatientEntry());
});

router.post ('/',(req, res) => {
  const {name, dateOfBirth, gender, occupation} = req.body;
  const newPatientEntry = appService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn: ''
  });
  console.log('the new patient is:',newPatientEntry);
  res.json(newPatientEntry);
});



export default router;