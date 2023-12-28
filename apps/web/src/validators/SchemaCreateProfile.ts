import { object, string } from 'yup';

const schemaCreateProfile = object({
  name: string().required('Require field'),
});

export default schemaCreateProfile;