import express from 'express';
import appService from '../services/appService';

const router = express.Router();


router.get('/', (_req, res) => {
  res.send(appService.getNonsensitivePatientEntry());
});



export default router;