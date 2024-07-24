import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DiagnoseEntry, EntryWithoutId, HealthCheckRating } from "../../types";


interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<DiagnoseEntry['code']>>([]);
    const [description, setDescription] = useState('');
    const [discharge, setDischarge] = useState<{ date: string; criteria: string }>({
        date: "",
        criteria: ""
    });
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState<{ startDate: string; endDate: string }>({ startDate: "", endDate: "" });
    const [type, setType] = useState<'Hospital' | 'HealthCheck' | 'OccupationalHealthcare'>('Hospital');

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const baseEntry = {
            date,
            specialist,
            diagnosisCodes,
            description,
        };

        let entryWithoutId: EntryWithoutId;

        switch (type) {
            case "Hospital":
                entryWithoutId = {
                    ...baseEntry,
                    type: "Hospital",
                    discharge,
                };
                break;
            case "HealthCheck":
                entryWithoutId = {
                    ...baseEntry,
                    type: "HealthCheck",
                    healthCheckRating,
                };
                break;
            case "OccupationalHealthcare":
                entryWithoutId = {
                    ...baseEntry,
                    type: "OccupationalHealthcare",
                    employerName,
                    sickLeave: sickLeave.startDate && sickLeave.endDate ? sickLeave : undefined,
                };
                break;
        }
        onSubmit(entryWithoutId);
    };
      //not the most elegant solution for MUI animation text laying over the placeholder downbelow in the return section -text shrinking, but it will do for now
    return (
        <div>
            <form onSubmit={addEntry}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        onChange={({ target }) => setType(target.value as 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare')}
                    >
                        <MenuItem value="Hospital">Hospital</MenuItem>
                        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                        <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }} 
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="Diagnosis Codes"
                    fullWidth
                    value={diagnosisCodes.join(',')}
                    onChange={({ target }) => {
                        const codes = target.value.split(',').map(code => code.trim());
                        setDiagnosisCodes(codes);
                    }}
                />
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                {type === "Hospital" && (
                    <>
                        <TextField
                            type="date"
                            label="Discharge Date"
                            fullWidth
                            value={discharge.date}
                            onChange={({ target }) => {
                                setDischarge({ ...discharge, date: target.value });
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }} 
                        />
                        <TextField
                            label="Discharge Criteria"
                            fullWidth
                            value={discharge.criteria}
                            onChange={({ target }) => {
                                setDischarge({ ...discharge, criteria: target.value });
                            }}
                        />
                    </>
                )}
                {type === "OccupationalHealthcare" && (
                    <>
                        <TextField
                            label="Employer Name"
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />
                        <TextField
                            type = "date"
                            label="Sick Leave Start Date"
                            fullWidth
                            value={sickLeave.startDate}
                            onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              max: sickLeave.startDate 
                            }}
                        />
                        <TextField
                            type="date"
                            label="Sick Leave End Date"
                            fullWidth
                            value={sickLeave.endDate}
                            onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              max: sickLeave.endDate 
                            }}
                        />
                    </>
                )}
                {type === "HealthCheck" && (
                    <TextField
                        label="Health Check Rating"
                        fullWidth
                        type="number"
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
                       
                    />
                )}
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
                            style={{ float: "right" }}
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
