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

export default function CheckboxesGroup() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      gilad: true,
      jason: false,
      antoine: false,
    });
  
    const handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
    };
  
    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;
  
    //dynamically load in items from the config table
    return(
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Model Configurations</FormLabel>
                <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
                    label="Jason Killian"
                />
                <FormControlLabel
                    control={
                    <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
                    }
                    label="Antoine Llorca"
                />
                </FormGroup>
                <FormHelperText>Choose configurations to display</FormHelperText>
            </FormControl>
        </div>
    );
}
