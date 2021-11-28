import React, { useContext } from 'react';
import {
  Typography,
  Checkbox,
  Button,
  makeStyles,
  withStyles,
  TextField,
} from '@material-ui/core';
import { FormContext } from './Form';

const useStyles = makeStyles((theme) => ({
  programsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  button: {
    width: '80vw',
    maxWidth: '50rem',
    margin: '1.5rem auto',
    padding: '1rem',
    height: '1rem',
    background: theme.palette.grey[400],
    // color: '#000',
    fontSize: '.75rem',

    '&:hover': {
      background: theme.palette.grey[600],
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      padding: '2rem',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
  },
  inputItem: {
    width: '90%',
    maxWidth: '30rem',
    margin: '1rem',
  },
}));

const handleSubmit = (e) => {
  console.log('FUCK');
};

const Disclosures = function disclosures() {
  const { setStep, setValues, values, programs } = useContext(FormContext);
  const classes = useStyles();

  if (programs.length < 1) return null;

  return (
    <div className={classes.programsContainer}>
      <h1 className={classes.title}>Disclosures for you to review.</h1>
      <h3 className={classes.subTitle}>
        Please read the information below. In order to continue with your
        application, all the following checkboxes must be checked.
      </h3>
      <form action="" onSubmit={() => console.log('submit')}>
        {programs.map((program, index) => (
          <Typography component="p" key={index} paragraph align="left">
            {program.Message}
            {program.Type === 'CheckBox' && (
              <div>
                <Checkbox color="primary" required />
                <span>I Agree</span>
              </div>
            )}
          </Typography>
        ))}

        <div>
          <TextField
            label="Sign here by typing your name"
            // onChange={handleChange('ssn')}
            // value={values.ssn}
            className={classes.inputItem}
            id="outlined-required"
            variant="outlined"
            placeholder="Your mom smells like cheese 🧀 "
            required
          />
          <TextField
            label="Enter a 4 Digit Pin"
            // onChange={handleChange('ssn')}
            // value={values.ssn}
            className={classes.inputItem}
            id="outlined-required"
            variant="outlined"
            required
          />
        </div>

        {/* <Button className={classes.button} onClick={(e) => handleSubmit(e)}> */}
        <Button className={classes.button} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Disclosures;
