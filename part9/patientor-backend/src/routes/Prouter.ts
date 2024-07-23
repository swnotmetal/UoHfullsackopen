/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import appService from '../services/appService';
import toNewPatientInput from '../utils/Putils';
import inputNewEntry from '../utils/Eutils';

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

router.get('/:id', (req, res) => {
  const patient = appService.findById(String(req.params.id));
  res.send(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log('Request body:', req.body);
    const patient = appService.findById(String(req.params.id));
    if(patient === undefined) {
      res.status(404).send('patitent not found');
      return;
    }
    const newEntry = inputNewEntry(req.body);
    const addedEntry = appService.addEntry(newEntry,patient);
    console.log('new entry', newEntry);
    res.json(addedEntry);
    console.log('addedEntry', addedEntry);
  } catch (error: unknown) {
    let errorMSG = 'Something is fishy';
    if (error instanceof Error) {
      errorMSG += ' Error: ' + error.message;
    }
    res.status(400).send(errorMSG);
  }   

});





export default router;