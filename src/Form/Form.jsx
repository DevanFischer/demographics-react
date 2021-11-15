import React, { useState, createContext, useEffect } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
//components
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import Programs from './Programs';
import Success from './Success';
import ErrorPage from './Error';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
/*
This form is a multi-step form. There are 5 separate components
each representing a page (the last two are reserved for success and error pages).
Each component controls its own buttons that way we can validate before moving
to the next section. The handle submit is done in this file but once you wire up
all the validation  it should probably be moved to the <Address/> component and
wired up to the submit button in there.

Instead of using props to share data/functions between components,
useContext is cleaner solution. Each component inside of the
FormContext.Provider is able to subscribe and use the values passed
into the value object prop. Think of it as global state for the form component.
*/

const useStyles = makeStyles((theme) => {
  return {
    formContainer: {
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translate(-50%,0%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80vw',
      maxWidth: '90rem',
      padding: '2rem',
      background: '#fff',
      borderRadius: '15px',
      border: `solid 1px ${theme.palette.grey[400]}`,

      [theme.breakpoints.up('sm')]: {
        top: '2rem',
      },
    },

    img: {
      margin: '2rem',
      width: '15rem',
    },
  };
});

// here is where we create the form context
export const FormContext = createContext({});

export const Form = () => {
  const classes = useStyles();

  // step 4 & 5 are reserved for the error and success page
  // if step is set to either, it will render that page.
  const [step, setStep] = useState(1);
  const [programs, setPrograms] = useState([]);
  // const [shipping, setShipping] = useState(false);
  const [values, setValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    suffix: 'No Suffix',
    birthday: '',
    ssn: '', // type <number>, issue with place holder displaying 0 instead of 'ssn'
    residence_address: '',
    res_apt: '',
    permanence: 'permanent',
    diff_shipping: false,
    shipping_address: '',
    ship_apt: '',
    ship_zipcode: '', // type <number>, issue with place holder displaying 0 instead of 'zip'
    selected_plan: '',
  });

  useEffect(() => {
    console.log('USE EFFECT: Values', values);
  }, [values]);

  // TODO: Dynamically get a logo based off query param
  const logo =
    'https://wia.toj.mybluehost.me/disclosureswp/wp-content/uploads/2021/07/image-3.png';

  // should be moved to <Address/> when address validation is created
  const sendPostValues = () => {
    const url = 'https://webhook.site/1fc1aed3-615d-434e-9717-1b2db79d536c';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(function (data) {
        //step 4 shows success page
        setStep(4);
        console.log('Request success: ', data);
      })
      .catch(function (error) {
        // step 5 shows error page
        setStep(5);
      });
  };

  // this is the meat and potatoes of the values state object.
  // It updates the state object with the name passed as an
  // parameter, as a key, and the input value for that element as the value.
  const handleChange = (name) => (e) => {
    // const target = name === 'shipping' ? !values.shipping : e.target.value;
    console.log(name);
    if (name === 'diff_shipping') {
      setValues({ ...values, [name]: !values.diff_shipping });
      // setShipping(!shipping);
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  // should be moved to <Address/> when address validation is created
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPostValues(values);
    setStep(4);
  };

  useEffect(() => {
    // make api call to get dynamic programs here

    // then set the programs with the response needs to be an array of objects
    setPrograms([
      {
        Code: '135PEBB',
        Description: '135% of Federal Poverty Guidelines',
      },
      {
        Code: 'MCAIDEBB',
        Description: 'Medicaid',
      },
      {
        Code: 'SLEBB',
        Description: 'Free and Reduced Price School Lunch Program',
      },
      {
        Code: 'FPHAEBB',
        Description: 'Federal Public Housing Assistance',
      },
      {
        Code: 'SNAPEBB',
        Description: 'Supplemental Nutrition Assistance Program',
      },
      {
        Code: 'SSIEBB',
        Description: 'Supplemental Security Income',
      },
      {
        Code: 'VSDPEBB',
        Description: 'Veterans Pension and Survivors Benefit',
      },
    ]);
  }, []);

  return (
    <Router>
      <div className={classes.formContainer}>
        <img className={classes.img} src={logo} alt="Company Logo" />

        {/* Main Form */}
        <FormContext.Provider
          value={{
            values,
            step,
            programs,
            // shipping,
            // setShipping,
            setValues,
            setStep,
            handleChange,
          }}
        >
          <FormControl
            component="form"
            // autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            {
              {
                1: <Programs />,
                2: <PersonalDetails />,
                3: <Address />,
                4: <Success />,
                5: <ErrorPage />,
              }[step]
            }
          </FormControl>
        </FormContext.Provider>

        {/* pagination */}
        {step !== 4 && step !== 5 && <p> Page {step} of 3 </p>}
      </div>
    </Router>
  );
};
export default Form;
