const ValidationMethods = {
  type(value) {
    let [type, errorMessage] = this.type;

    // eslint-disable-next-line eqeqeq
    return type(value) != value ? errorMessage : null;
  },
  required(value) {
    let [isRequired, errorMessage] = this.required;

    return isRequired && value === '' ? errorMessage : null;
  },
  positive(value) {
    let [isPositive, errorMessage] = this.positive;

    return isPositive && value < 0 ? errorMessage : null;
  },
}

class FormValidator {
  constructor(scheme) {
    this.scheme = scheme;
  }

  validateField(field, value) {
    let fieldScheme = this.scheme[field];

    if (!fieldScheme) return;
    
    let errors = [];

    Object.keys(fieldScheme).forEach((key) => {
      let method = ValidationMethods[key].bind(fieldScheme);
      let error = method(value);

      if (error) {
        errors.push(error);
      }
    });

    return errors.length ? errors : null;
  }

  validate(data) {
    return new Promise((resolve, reject) => {
      let errors = Object.keys(data).reduce((allErrors, field) => {
        let errors = this.validateField(field, data[field]);

        if (errors) {
          allErrors[field] = errors;
        }

        return allErrors;
      }, {});

      if (Object.keys(errors).length === 0) {
        resolve();
      } else {
        reject(errors);
      }
    });
  }
}

export default FormValidator;
