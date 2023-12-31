import { object, string, ref } from 'yup';
import { NAME_REGEX } from '../constants/regex';

const schemaSignUp= object({
  name: string().max(15, 'Name must have maximum 15 characters').matches(NAME_REGEX, 'Name must only contain letters and spaces').required('Name is a required field'),
  email: string().email('Format is invalid').required('Email is a required field'),
  password: string().min(8, 'Password must have minimum 8 characters').required('Password is a required field'),
  confirmPassword: string().oneOf([ref('password'), ''], 'Passwords must match').required('Confirm password is a required field'),
});

export default schemaSignUp;