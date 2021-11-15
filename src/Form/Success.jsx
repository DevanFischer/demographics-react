import { makeStyles } from '@material-ui/core';
import { CheckmarkSvg } from '../Assets/Checkmark';
const useStyles = makeStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const Success = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <CheckmarkSvg />
      </div>

      <h1>Thank you!</h1>
      <p>Your submission has been sent.</p>
    </div>
  );
};
export default Success;
