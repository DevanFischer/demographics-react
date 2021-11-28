import React, { useState, createContext, useEffect, useMemo } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  // useLocation,
} from 'react-router-dom';

// Components
import Disclosures from './Disclosures';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import Success from './Success';
import ErrorPage from './Error';

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

const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: 'absolute',
    top: '1rem',
    left: '50%',
    transform: 'translate(-50%,0%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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
}));

// here is where we create the form context
export const FormContext = createContext({});

export const Form = function () {
  const classes = useStyles();

  // step 4 & 5 are reserved for the error and success page
  // if step is set to either, it will render that page.
  const [step, setStep] = useState(1);

  const [programs, setPrograms] = useState([]);

  const [values, setValues] = useState({
    token: '31054289-e4eb-eb11-a965-005056a96ce9',
    package_id: '906b96d4-5f49-ec11-a969-005056a9d342',
    state: 'KY',
    tribal: 'false',
    program_code: '135P',
  });

  // useEffect(() => {
  //   console.log('USE EFFECT: Values', values);
  // }, [values]);

  const disclosuresConfig = () => {
    const url = 'https://lifeline.cgmllc.net/api/v2/disclosuresconfiguration';

    const payload = {
      Token: values.token,
      PackageID: values.package_id,
      ResidenceState: values.state,
      TribalResident: values.tribal,
      EligibilityProgram: values.program_code,
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((data) => {
        // step 4 shows success page
        // setStep(4);
        console.log('Request success: ', data);
      })
      .catch((error) => {
        console.error(error);
        // step 5 shows error page
        // setStep(5);
      });
  };

  // this is the meat and potatoes of the values state object.
  // It updates the state object with the name passed as an
  // parameter, as a key, and the input value for that element as the value.
  const handleChange = (name) => (e) => {
    // console.log(name);
    setValues({ ...values, [name]: e.target.value });
  };

  // should be moved to <Address/> when address validation is created
  const handleSubmit = (e) => {
    e.preventDefault();
    // sendPostValues(values);
    setStep(4);
  };

  useEffect(() => {
    // make api call to get dynamic programs here
    // disclosuresConfig();
    // then set the programs with the response needs to be an array of objects
    setPrograms([
      {
        Sequence: 0,
        Type: 'Text',
        PageNumber: 2,
        Message:
          'A complete and signed Lifeline Service Application and Certification ("Certification") is required to enroll you in StandUp Wireless\' Lifeline service program in your state. This Certification is only for the purpose of verifying your eligibility for Lifeline service and will not be used for any other purpose. Service requests will not be processed until this Form has been received and verified by Company.',
      },
      {
        Sequence: 1,
        Type: 'Text',
        PageNumber: 2,
        Message:
          "Activation and usage requirement disclosures: I understand this service is a prepaid service, and I must personally activate the service. To keep my account active, I must use the service at least once during any 30-day period by completing an outbound call, sending at text message, using my mobile broadband connection (use data), purchasing additional service from the company, answering an in-bound call from someone other than StandUp Wireless, or by responding to a direct contact from StandUp Wireless confirming that I want to continue receiving Lifeline service from StandUp Wireless. If my service goes unused for 30 days, I will no longer be eligible for Lifeline benefits and my service will be suspended (allowing only 911 calls and calls to the StandUp Wireless's customer care center) subject to a 15-day cure period during which I may use the service (as described above) or contact StandUp Wireless to confirm I want to continue receiving Lifeline service.",
      },
      {
        Sequence: 2,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'I hereby certify that I have read and understood the disclosures listed above regarding activation and usage requirements.',
      },
      {
        Sequence: 3,
        Type: 'Text',
        PageNumber: 2,
        Message: 'Authorizations:',
      },
      {
        Sequence: 4,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'I understand I have the right to enroll in the Lifeline service using non-electronic methods. I further understand that I have the right to withdraw this consent at any time prior to activation of my service. The Company has advised me that I may request a paper copy of my contract and associated fees by calling 611 from my wireless handset.',
      },
      {
        Sequence: 5,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          "I hereby authorize the Company to send me notifications, via text messages, emails, and phone calls (by automated telephone dialing system, manually, or with pre-recorded/artificial voice messages) regarding my Lifeline benefit, marketing messages, and promotional offers. I may withdraw my consent to receive some of these messages by dialing 611 from my Company provided wireless number. Opting out will not affect the Company's ability to contact me with messages regarding the Lifeline program and/or service functionality via the methods listed herein.",
      },
      {
        Sequence: 6,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'I acknowledge that I am providing the information I have included in this application to CGM, LLC and further authorize CGM, LLC to receive and use my information for enrollment verification and waste, fraud and abuse mitigation purposes. Additionally, I authorize CGM to receive and use my historic Lifeline enrollment information for enrollment verification and waste, fraud and abuse mitigation purposes.',
      },
      {
        Sequence: 7,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'I understand Lifeline benefits are limited to one per household. If I am found to already be receiving a Lifeline discount benefit from another Lifeline provider, I understand my current benefit will be transferred to StandUp Wireless. I consent to the transfer of my Lifeline discount benefit from my current Lifeline provider to StandUp Wireless.',
      },
      {
        Sequence: 8,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'I agree that my service provider can give the Lifeline Program administrator all of the information I am giving on this form. I understand that this information is meant to help run the Lifeline Program and that if I do not let them give it to the Administrator, I will not be able to get Lifeline benefits.',
      },
      {
        Sequence: 9,
        Type: 'CheckBox',
        PageNumber: 2,
        Message:
          'By checking this box, I hereby certify, under penalty of perjury, that the information included in this certification form is true and correct to the best of my knowledge.',
      },
    ]);
  }, []);

  return (
    <Router>
      <div className={classes.formContainer}>
        {/* <img className={classes.img} src={logo} alt="Company Logo" /> */}

        {/* Main Form */}
        <FormContext.Provider
          value={useMemo({
            values,
            step,
            programs,
            setValues,
            setStep,
            handleChange,
          })}
        >
          <FormControl component="form" onSubmit={(e) => handleSubmit(e)}>
            {
              {
                1: <Disclosures />,
                2: <PersonalDetails />,
                3: <Address />,
                4: <Success />,
                5: <ErrorPage />,
              }[step]
            }
          </FormControl>
        </FormContext.Provider>

        {/* pagination */}
        {/* {step !== 4 && step !== 5 && <p> Page {step} of 3 </p>} */}
      </div>
    </Router>
  );
};
export default Form;
