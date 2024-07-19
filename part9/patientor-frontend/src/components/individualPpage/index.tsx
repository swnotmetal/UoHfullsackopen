
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  Patient, Diagnosis, Entry } from '../../types';
import patientService from '../../services/patients';
import {Male, Female, Transgender as Other, Work, LocalHospital, MedicalServicesRounded} from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';

import { Box,Typography, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';
import React from 'react';

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

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const getEntryTypeIcon = (type: string) => {
    switch(type) {
      case "Hospital":
        return <LocalHospital />;
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <MedicalServicesRounded />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          {getEntryTypeIcon(entry.type)}
          <span style={{ marginLeft: '8px' }}>{entry.date}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {entry.description}
        </Typography>
        {entry.diagnosisCodes && (
          <List dense>
            {entry.diagnosisCodes.map((code) => (
              <ListItem key={code}>
                <ListItemText 
                  primary={
                    <React.Fragment>
                      <Chip label={code} size="small" />
                      <span style={{ marginLeft: '8px' }}>{diagnosisInfo(code)}</span>
                    </React.Fragment>
                  } 
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
return (
  <div>
  {patient ? (
    <>
      <h2>{patient.name}</h2> 
      <IconWithText Icon={GenderIcons} text={patient.gender} />
      <IconWithText Icon={BadgeIcon} text={patient.ssn} />
      <IconWithText Icon={Work} text={patient.occupation} />
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Entries</Typography>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))
      ) : (
        <Typography>No entries available</Typography>
      )}
    </>
  ) : (
    <Typography>Loading...</Typography>
  )}
</div>
 );
};

export default PatientPage;