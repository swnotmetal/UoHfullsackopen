
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import {Male, Female, Transgender as Other, Work,} from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import { Box, Typography } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({diagnoses}: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getOne(id);
        console.log("Fetched patient:", JSON.stringify(fetchedPatient, null, 2));
        setPatient(fetchedPatient);
      }
    };
    fetchPatient();
  }, [id]);


  const GenderIcons =({gender}: {gender?: string}) => {

    if (!gender) return null;

    switch(gender.toLowerCase() ) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Other />;
      default:
        return null;
    }
  };

 const diagnosisInfo = (code: string): string => {
  const diagnosis = diagnoses.find(d => d.code === code);
  return diagnosis ? ` ${diagnosis.name}` : '';
 };

 const IconWithText = ({ Icon, text }: { Icon: React.ElementType, text?: string }) => (
  <Box display="flex" alignItems="center" marginY={1}>
    <Icon gender={text} />
    <Typography variant="body1" style={{ marginLeft: '8px' }}>
      {text || 'Unknown'}
    </Typography>
  </Box>
);
return (
  <div>
    {patient ? (
      <>
        <h2>{patient.name}</h2> 
        <IconWithText Icon={GenderIcons} text={patient.gender} />
        <IconWithText Icon={BadgeIcon} text={patient.ssn} />
        <IconWithText Icon={Work} text={patient.occupation} />
      </>
    ) : (
      <p>Loading...</p>
    )}
  <div>
  <h4>Entries</h4>
  {patient?.entries?.map((p) => (
    <div key={p.id}>
      <p>{p.date}</p>
      <p>{p.description}</p>
      <ul>
      {p.diagnosisCodes?.map(code => (
        <li key={code}>
          {code} {diagnosisInfo(code)}
        </li>
      ))}
      </ul>
    </div>
  ))}
</div>
</div>
);
};

export default PatientPage;