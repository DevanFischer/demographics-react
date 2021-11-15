import './App.css';
// mui
import { makeStyles } from '@material-ui/core';
// components
import Form from './Form/Form';

const useStyles = makeStyles((theme) => {
  return {
    banner: {
      background: '#603394',
      // background: theme.palette.grey[400],
      width: '100%',
      height: '20rem',
      position: 'relative',
    },
  };
});

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.banner}></div>
      <Form />
    </div>
  );
}

export default App;
