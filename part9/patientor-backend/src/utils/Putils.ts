import { NewPatientInput, Gender } from "../types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isHumanGender= (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

const parseName = (name: unknown):string => {
    if(!name || !isString(name)) {
        throw new Error ('Incorrect or missing correct name');
    }
    return name;
};
const parseDoB = (dateOfBirth: unknown):string => {
    if(!dateOfBirth|| !isString(dateOfBirth)) {
        throw new Error ('Incorrect or missing correct DoB');
    }
    return dateOfBirth;
};
const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error ('Incorrect or missing correct ssn input');
    }
    return ssn;
};
const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isHumanGender(gender)) {
        throw new Error ('Incorrect or missing correct gender' + gender);
    }
    return gender;
};
const parseJob = ( occupation: unknown) :string => {
    if (!occupation || !isString(occupation)) {
        throw new Error ('Incorrect or missing correct occupation');
    }
    return occupation;
};



const toNewPatientInput = (object: unknown ): NewPatientInput => {
    if (! object || typeof object !== 'object') {
        throw new Error ('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
    const newEntry: NewPatientInput = {
        name: parseName(object.name),
        dateOfBirth: parseDoB(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseJob(object.occupation),
        entries: []
    };
    return newEntry;
    }
    throw new Error('some fields are missing');
};

export default toNewPatientInput;