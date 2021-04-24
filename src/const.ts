import *  as yup from 'yup'

export const Const = {
  MAX_FORM_LENGTH: 48,
  NO_CONFIG: {configId: 0, configCargos: [], name: 'No Config', aircraftId: 0},
  PERMAC_DECIMAL: 2,
  schema: {
    intPositiveSchema: yup
    .number()
    .typeError('this must be a number')
    .required()
    .positive(),

    stringSchema: yup
    .string().required(),

    numSchema: yup
    .number()
    .typeError('this must be a number')
    .required()
    .positive(),

    categorySchema: yup
    .mixed()
    .oneOf(['Emergency','Extra', 'Steward'])
  }
}
