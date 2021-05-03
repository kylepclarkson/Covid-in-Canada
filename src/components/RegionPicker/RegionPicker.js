import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from './RegionPicker.module.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * The selector for which region's data to view.
 */

export default function RegionPicker(props) {

  const classes = useStyles();

  const handleChange = (event) => {
    props.handleSetRegion(event.target.value);
  };

  // Provinces of canada with values that are needed when calling the API. 
  return (
    <div className={styles.container}>
      <FormControl className={classes.formControl}>
      <InputLabel id="simple-select-label">Region</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        defaultValue={props.currentRegion}
        onChange={handleChange}
      >
        <MenuItem value="canada">Canada</MenuItem>
        <MenuItem value="AB">Alberta</MenuItem>
        <MenuItem value="BC">British Columbia</MenuItem>
        <MenuItem value="MB">Manitoba</MenuItem>
        <MenuItem value="NB">New Brunswick</MenuItem>
        <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
        <MenuItem value="NT">Northwest Territories</MenuItem>
        <MenuItem value="NS">Nova Scotia</MenuItem>
        <MenuItem value="NU">Nunavut</MenuItem>
        <MenuItem value="ON">Ontario</MenuItem>
        <MenuItem value="PE">Prince Edward Island</MenuItem>
        <MenuItem value="QC">Quebec</MenuItem>
        <MenuItem value="SK">Saskatchewan</MenuItem>
        <MenuItem value="YT">Yukon</MenuItem>
        <MenuItem value="RP">Repatriated</MenuItem>
      </Select>
    </FormControl>
    </div>
  )
}
