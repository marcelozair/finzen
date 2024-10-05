import { AnyObject, ObjectSchema, number, object, string } from 'yup';

type typeSchemaCreateWallet =  ObjectSchema<{
  color: string;
  typeId: number;
  name: string;
  bankId: number | null;
  accountNumber: string;
  closingDate: number | null;
  dueDate: number | null;
  balance: number;
}, AnyObject, {
  color: undefined;
  typeId: undefined;
  name: undefined;
  bankId: undefined;
  accountNumber: undefined;
  closingDate: undefined;
  dueDate: undefined;
  balance: undefined;
}, "">

const schemaCreateWallet = object({
  color: string().required('Required field'),
  typeId: number().required('Required field'),
  name: string().max(20).required('Required field'),
  balance: number().min(0).required('Required field'),

  bankId: number().required('Required field').when('typeId', {
    is: (value: number) => value === 1,
    then: (schema) => schema.notRequired().nullable(),
  }),

  accountNumber: string().max(4).required('Required field').when('typeId', {
    is: (value: number) => value === 1,
    then: (schema) => schema.nullable().notRequired(),
  }),

  dueDate: number().max(31).required('Required field').when('typeId', {
    is: (value: number) => value === 1,
    then: (schema) => schema.nullable().notRequired(),
  }),

  closingDate: number().max(31).required('Required field').when('typeId', {
    is: (value: number) => value === 1,
    then: (schema) => schema.nullable().notRequired(),
  }),
}) as typeSchemaCreateWallet;

export default schemaCreateWallet;
