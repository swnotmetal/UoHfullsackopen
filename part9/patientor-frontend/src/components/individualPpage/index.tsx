
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import patientService from '../../services/patients';
import {Male, Female, Transgender as Other} from '@mui/icons-material';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const Icons =({gender}: {gender: string}) => {
    switch(gender.toLocaleLowerCase() ) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Other />;
    }
  };

  return (
    <div>
      <h2>{patient?.name}</h2> 
      <p>
        <Icons gender={patient?.gender || ''} />
        {patient?.gender}
        </p>
      <p>ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>

    </div>
  );
};

export default PatientPage;