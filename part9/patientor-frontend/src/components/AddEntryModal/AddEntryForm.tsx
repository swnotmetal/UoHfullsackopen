
import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button } from '@mui/material';
import {  DiagnoseEntry,  HospitalEntryWithoutId } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: HospitalEntryWithoutId) => void;
}

const AddEntryForm = ({onCancel, onSubmit}: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<DiagnoseEntry['code']>>([]);
    const [description, setDiscription] = useState('');
    const [discharge, setDischarge] = useState<{date: string; criteria: string}>({
        date:"",
        criteria: ""
    });

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            type: "Hospital",
            date,
            specialist,
            diagnosisCodes,
            description,
            discharge

        });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField 
                label="date"
                fullWidth
                value={date}
                onChange={({target}) => setDate(target.value)}
                />
                <TextField 
                label="specialist"
                fullWidth
                value={specialist}
                onChange={({target}) => setSpecialist(target.value)}
                />
                <TextField 
                label="diagnosisCodes"
                fullWidth
                value={diagnosisCodes.join(',')}
                onChange={({target}) => {
                    const codes = target.value.split(',').map(code => code.trim());
                    setDiagnosisCodes(codes);
                }}
                
                />
                   <TextField 
                label="description"
                fullWidth
                value={description}
                onChange={({target}) => setDiscription(target.value)}
                />
                    <TextField 
                label="discharge date"
                fullWidth
                value={discharge.date}
                onChange={({target}) => {
                    setDischarge({...discharge, date: target.value});
                } }
                />
                     <TextField 
                label="discharge criteria"
                fullWidth
                value={discharge.criteria}
                onChange={({target}) => {
                    setDischarge({...discharge, criteria: target.value});
                } }
                />
                  <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
                
            </form>
        </div>
        
    );
};

export default AddEntryForm;