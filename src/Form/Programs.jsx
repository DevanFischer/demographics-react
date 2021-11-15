import React, { useContext } from 'react';
import { FormContext } from './Form';
import { Button, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    programsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    button: {
      width: '80vw',
      maxWidth: '50rem',
      margin: '1.5rem 0',
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
      fontSize: '1.2rem',
      fontWeight: 600,
    },
  };
});

const Programs = () => {
  const { setStep, setValues, values, programs } = useContext(FormContext);
  const classes = useStyles();

  const handleProgramClick = (program) => {
    setStep(2);
    // when program is clicked update the selected plan in the state to the program code
    setValues({ ...values, selected_plan: program.Code });
  };

  if (programs.length < 1) return null;

  return (
    <div className={classes.programsContainer}>
      <span className={classes.title}>
        Please select one of the government programs you are enrolled in below.
      </span>

      {programs.map((program, index) => {
        return (
          <Button
            variant="contained"
            key={index}
            className={classes.button}
            onClick={() => handleProgramClick(program)}
            value={program.Code}
          >
            <span>{program.Description}</span>
          </Button>
        );
      })}
    </div>
  );
};
export default Programs;
