import axios from "axios";
import { Diagnosis, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getOne = async (id: string): Promise<Patient> => {
  const {data} = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnose = async () => {
  const {data} = await axios.get<Diagnosis []> (
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};

export default {
  getAll, create, getOne, getDiagnose
};

