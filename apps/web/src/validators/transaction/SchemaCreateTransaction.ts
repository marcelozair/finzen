import { number, object, string } from 'yup';

const schemaCreateTransaction = object({
  type: string().required('Required field'),
  amount: number().required('Required field'),
  concept: string().required('Required field'),
});

export default schemaCreateTransaction;
