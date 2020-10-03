import { FORM_ERROR_MESSAGES } from 'utils/constants';

const { IS_STRING, REQUIRED, POSITIVE, IS_NUMBER } = FORM_ERROR_MESSAGES;

const UserScheme = {
  name: {
    type: [String, IS_STRING],
    required: [true, REQUIRED],
  },
  surname: {
    type: [String, IS_STRING],
    required: [true, REQUIRED],
  },
  age: {
    type: [Number, IS_NUMBER],
    required: [true, REQUIRED],
    positive: [true, POSITIVE],
  },
  city: {
    type: [String, IS_STRING],
    required: [true, REQUIRED],
  },
};

export default UserScheme;
