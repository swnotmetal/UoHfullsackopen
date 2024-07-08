import diagnosedata from '../../data/diagnoses';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';


import { DiagnoseEntry, NonSensitivePatientEntry, NewPatientInput } from '../types';

const getDiagonse = (): DiagnoseEntry[] => {
    return diagnosedata;
};

const getNonsensitivePatientEntry = () : NonSensitivePatientEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientInput): NonSensitivePatientEntry => {
    const NewPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...entry
    };
    patientData.push(NewPatientEntry);

    return NewPatientEntry;
};

export default {
    getDiagonse,
    getNonsensitivePatientEntry,
    addPatient
};