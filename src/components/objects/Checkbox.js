import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      borderLeft: '1px solid gray',
      height: "100%"
    },
    formControl: {
      margin: theme.spacing(3)
    },
}));

export default function CheckboxesGroup({onCheck, graphNames}) {
  const classes = useStyles();

  const toggles = Object.entries(graphNames).map(([name, toggleOn]) => 
                    <FormControlLabel
                    control={<Checkbox checked={name} onChange={onCheck} value={toggleOn} />}
                    label={name}
                />
                )
        
    return(
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Model Configurations</FormLabel>
                <FormGroup>
                  {toggles}
                {/* <FormControlLabel
                    control={<Checkbox checked={gilad} onChange={handleChange} value="gilad" />}
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={
                    <Checkbox checked={antoine} onChange={onCheck} value="antoine" />
                    }
                    label="Antoine Llorca"
                /> */}
                </FormGroup>
                <FormHelperText>Choose configurations to display</FormHelperText>
            </FormControl>
        </div>
    );
}
