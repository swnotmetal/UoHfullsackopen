/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import appService from '../services/appService';
import toNewPatientInput from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
  res.send(appService.getNonsensitivePatientEntry());
});

router.post ('/',(req, res) => {
  try {
    const newPatientInput = toNewPatientInput(req.body);
    const addedEntry = appService.addPatient(newPatientInput);
    res.json(addedEntry);
  }catch( error: unknown) {
    let errorMSG = 'Something is fishy';
    if (error instanceof Error) {
      errorMSG += ' Error: ' + error.message;
    }
    res.status(400).send(errorMSG);
  }
});



export default router;