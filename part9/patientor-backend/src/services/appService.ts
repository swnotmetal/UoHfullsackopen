import diagnosedata from '../../data/diagnoses';
import patientData from '../../data/patients';

import { DiagnoseEntry, NonSensitivePatientEntry } from '../types';

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

export default {
    getDiagonse,
    getNonsensitivePatientEntry
};