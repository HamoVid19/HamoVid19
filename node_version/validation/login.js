const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!validator.isEmail(data.email)){
    errors.email = 'email is not valid '
  }
  if(validator.isEmpty(data.email)){
    errors.email = 'email is requird '
  }
  if(validator.isEmpty(data.password)){
    errors.password = 'password is requird '
  }

  if (!validator.isLength(data.password, { min: 5, max: 40 })) {
    errors.password =
      "pasdword is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
