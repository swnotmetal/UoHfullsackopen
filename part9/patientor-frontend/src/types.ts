export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string 
}
interface BaseEntry {
    id: string;
    description: string;
    date:string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk =3
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}
export type Entry = 
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;



export interface PatientEntry {
    id: string,
    name:string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string;
    entries: Entry[]
}
export type NewBaseEntry = Omit<BaseEntry, 'id' | 'type'>;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientInput = Omit<PatientEntry, 'id' >;

export type NoSsnPatient = Omit<PatientEntry, 'ssn'>;

export type PatientFormValues = Omit<PatientEntry, "id" | "entries">;

export type HealthCheckEntryFormValue = Omit<HealthCheckEntry, 'id'>;

export type HospitalEntryFormValue = Omit<HospitalEntry, 'id' | 'type'>;

export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id'>;
