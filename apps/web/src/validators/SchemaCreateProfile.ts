import { object, string } from 'yup';

const schemaCreateProfile = object({
  name: string().required('Required field'),
});

export default schemaCreateProfile;