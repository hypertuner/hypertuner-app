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

export default function CheckboxesGroup(onCheck, graphNames) {
    const classes = useStyles();
  
    // const handleChange = name => event => {
    //   setState({ ...state, [name]: event.target.checked });
      
    // };
  
  const { gilad, jason, antoine } = graphNames;
        
    return(
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Model Configurations</FormLabel>
                <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={gilad} onChange={onCheck} value="gilad" />}
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={<Checkbox checked={jason} onChange={onCheck} value="jason" />}
                    label="Jason Killian"
                />
                <FormControlLabel
                    control={
                    <Checkbox checked={antoine} onChange={onCheck} value="antoine" />
                    }
                    label="Antoine Llorca"
                />
                </FormGroup>
                <FormHelperText>Choose configurations to display</FormHelperText>
            </FormControl>
        </div>
    );
}
