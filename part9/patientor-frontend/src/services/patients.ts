import axios from "axios";
import { DiagnoseEntry, Entry, EntryWithoutId, PatientEntry, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientEntry[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getOne = async (id: string): Promise<PatientEntry> => {
  const {data} = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnose = async () => {
  const {data} = await axios.get<DiagnoseEntry []> (
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};

const addEntry = async (patientId: string, object: EntryWithoutId ) => {
  const {data} = await axios.post<Entry> (
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  return data;
};

export default {
  getAll, create, getOne, getDiagnose, addEntry
};

