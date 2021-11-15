import { Button, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { ErrorSvg } from '../Assets/ErrorX';
import { FormContext } from './Form';
const useStyles = makeStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const ErrorPage = () => {
  const classes = useStyles();
  const { step } = useContext(FormContext);
  return (
    <div className={classes.container}>
      <div>
        <ErrorSvg />
      </div>

      <h1>Uh oh!</h1>
      <p>The was an error, please resubmit the form again.</p>
      {step === 5 && <Button className={classes.pagebutton}>Try again</Button>}
    </div>
  );
};
export default ErrorPage;
