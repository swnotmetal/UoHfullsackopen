import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from './components/individualPpage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnose, setDiagnose] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
   
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnoses = await patientService.getDiagnose();
      setDiagnose(diagnoses);

    };
    void fetchDiagnoses();
  }, []);

  //const match = useMatch('/patients/:id');

  /*const patient = match
    ? patients.find(p => p.id === match.params.id)
    : null;*/

  return (
    <div className="App">

        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage diagnoses={diagnose}/>} />
          </Routes>
        </Container>

    </div>
  );
};

export default App;
