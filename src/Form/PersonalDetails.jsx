import React, { useContext, useState } from 'react';
import { FormContext } from './Form';
import { personDetailsValidation } from './Validation';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    inputItem: {
      width: '90%',
      maxWidth: '30rem',
      margin: '1rem',
    },

    pagebutton: {
      background: theme.palette.grey[300],
      width: '10rem',
      margin: '1rem',
    },
  };
});

const PersonalDetails = () => {
  const { values, handleChange, step, setStep } = useContext(FormContext);
  const classes = useStyles();

  const [errors, setErrors] = useState({});

  const handleContinue = (e) => {
    e.preventDefault();
    // every time you click the next btn it updates the errors state object
    // if there are errors present it breaks out of this, if there are no errors it sets step + 1
    const errors = personDetailsValidation(values);
    setErrors(errors);
    // if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };

  return (
    <div>
      <TextField
        label="First Name"
        onChange={handleChange('first_name')}
        value={values.first_name}
        className={classes.inputItem}
        id="outlined-required"
        variant="outlined"
        error={errors.first_name}
        required
        // autoFocus
        // fullWidth
      />

      <TextField
        label="Middle Name"
        onChange={handleChange('middle_name')}
        value={values.middle_name}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
      />

      <TextField
        label="Last Name"
        onChange={handleChange('last_name')}
        value={values.last_name}
        className={classes.inputItem}
        id="outlined-required"
        variant="outlined"
        error={errors.last_name}
        required
        // fullWidth
      />

      <TextField
        label="Second Last Name"
        onChange={handleChange('second_last_name')}
        value={values.second_last_name}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
      />

      <TextField
        label="Suffix"
        onChange={handleChange('suffix')}
        value={values.suffix}
        className={classes.inputItem}
        id="outlined"
        variant="outlined"
        select
      >
        <MenuItem value="No Suffix">No Suffix</MenuItem>
        <MenuItem value="Jr">Jr</MenuItem>
        <MenuItem value="Sr">Sr</MenuItem>
        <MenuItem value="I">I</MenuItem>
        <MenuItem value="III">II</MenuItem>
        <MenuItem value="III">III</MenuItem>
        <MenuItem value="IV">IV</MenuItem>
      </TextField>

      <TextField
        label="Birthday"
        onChange={handleChange('birthday')}
        value={values.birthday}
        className={classes.inputItem}
        id="date"
        variant="outlined"
        error={errors.birthday}
        required
        InputLabelProps={{ shrink: true }}
        type="date"
      />

      <TextField
        label="Last 4 of Social"
        onChange={handleChange('ssn')}
        value={values.ssn}
        className={classes.inputItem}
        id="outlined-required"
        variant="outlined"
        placeholder="&times;&times;&times;&times;"
        error={errors.ssn}
        required
      />

      {/* buttons */}
      <div>
        <Button onClick={prevStep} className={classes.pagebutton}>
          prev
        </Button>

        <Button
          className={classes.pagebutton}
          onClick={(e) => handleContinue(e)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
