export const personDetailsValidation = (values) => {
  let errors = {};
  if (values.first_name === '') {
    errors.first_name = true;
  }
  if (values.last_name === '') {
    errors.last_name = true;
  }
  if (values.birthday === '') {
    errors.birthday = true;
  }
  const regex = new RegExp('\\b\\d{4}\\b');
  if (!regex.test(values.ssn)) {
    errors.ssn = 'true';
  }
  return errors;
};

export const addressValidation = (values, shipping) => {
  let errors = {};
  if (values.residence_address === '') {
    errors.residence_address = true;
  }
  if (shipping === true) {
    if (values.shipping_address === '') {
      errors.shipping_address = true;
    }
    if (values.ship_zipcode === '') {
      errors.ship_zipcode = true;
    }
  }
  return errors;
};
