import diagnosedata from '../../data/diagnoses';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';


import { DiagnoseEntry, NewPatientInput, NoSsnPatient, PatientEntry } from '../types';

const getDiagonse = (): DiagnoseEntry[] => {
    return diagnosedata;
};

const getNonsensitivePatientEntry = () : NoSsnPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatientInput): PatientEntry => {
    const newPatientEntry = {
      id: uuid(),
      ...entry,
      entries: [] 
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
  };

const findById = (id: string): PatientEntry | undefined => {
    const entry = patientData.find(d => d.id === id);
    return entry;
};

export default {
    getDiagonse,
    getNonsensitivePatientEntry,
    addPatient,
    findById
};