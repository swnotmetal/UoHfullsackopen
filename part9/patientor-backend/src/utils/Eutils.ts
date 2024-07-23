
import { HealthCheckRating, DiagnoseEntry, SickLeave, Discharge, EntryWithoutId, NewBaseEntry } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isHealthrating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isDate = (date: string ): boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (text: unknown): text is number => {
    return typeof text  === 'number' || text instanceof Number;
};

const parseDate = (date: unknown): string=> {
    if(!date || !isString(date) || !isDate(date) ) {
        throw new Error(' Incorrect or missing correct date format'+ date);
    }
    return date;
};


const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error(' Incorrect or missing correct format');
    }
    return specialist;
};

const parseWPname = ( employerName: unknown): string => {
    if(!employerName || !isString(employerName))  {
        throw new Error(' Incorrect or missing correct format');
    }
    return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
    console.log('parseDiagnosisCodes input:', object);
    
    if (Array.isArray(object)) {
        return object as Array<DiagnoseEntry['code']>;
    }

    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        console.log('Diagnosis codes not found, returning empty array.');
        return [] as Array<DiagnoseEntry['code']>;
    }

    console.log('Diagnosis codes found:', object.diagnosisCodes);
    return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};
// written by AI because I did not understand the reason why the codes had always returned in [].

const parseDescription = ( description: unknown): string => {
    if(!description || !isString(description))  {
        throw new Error(' Incorrect or missing correct format');
    }
    return description;
};

const parseSickLeave = (object: unknown): SickLeave  => {

    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('startDate' in object && 'endDate' in object) {
        return {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };
    }
    throw new Error ('sick leave field is missing some data');
};

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)){
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};

const parseDischarge = (object: unknown): Discharge => {

    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in object && 'criteria' in object) {
        return {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria)
        };
    }
    throw new Error ('Discharge input incorrect or missing!');
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthrating(healthCheckRating)) {
        throw new Error (' Incorrect or missing correct format') ;
    }

    return healthCheckRating;
};

const inputNewEntry = (object: unknown): EntryWithoutId => {
    console.log('checking input:',object);
    if (! object || typeof object !== 'object') {
        throw new Error ('Incorrect or missing data');
    }

    if (!('type' in object)) {
        throw new Error ('Missing entry type');
    } 
    if( 'description' in object
        && 'date' in object
        && 'specialist' in object){
    
        const baseEntry: NewBaseEntry = 'diagnosisCodes' in object ?
        {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        }
        : 
        {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist)
        };
  

    switch (object.type) {
        case "HealthCheck":
            if('healthCheckingRating' in object ) {
              const healthCheckEntry: EntryWithoutId = {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckingRating)
              };
              return healthCheckEntry;
            }
            throw new Error ('the rating is missing or wrong data');

        case "OccupationalHealthcare":
            if('employerName' in object) {
                const occupationalEntry: EntryWithoutId = {
                    ...baseEntry,
                    type: "OccupationalHealthcare",
                    employerName: parseWPname(object.employerName)
                };
            if('sickLeave' in object) {
                occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
            }

            return occupationalEntry;
            }
            throw new Error ('employer name is missing');
        case "Hospital":
            if('discharge' in object) {
                const hospitalEntry: EntryWithoutId = {
                    ...baseEntry,
                    type:"Hospital",
                    discharge: parseDischarge(object.discharge)
                };
                return hospitalEntry;
            }
            throw new Error ('discharge date incorrect or missing');
        default:
            throw new Error ('Invalid entry type');
   
    }
  


        }
        throw new Error('Incorrect data: a field missing');
};

export default inputNewEntry;