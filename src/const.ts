import * as yup from 'yup'
export const Const = {
  SELECT_WIDTH: 120,
  API_EPS: [
    'aircraft',
    'cargo',
    'config',
    'configCargo',
    'glossary',
    'tank',
    'user',
  ],
  MAX_FORM_LENGTH: 48,
  NO_CONFIG: {configId: 0, configCargos: [], name: 'No Config', aircraftId: 0},
  PERMAC_DECIMAL: 2,
  schema: {
    intPositiveSchema: yup
      .number()
      .typeError('this must be a number')
      .required()
      .positive(),

    intSchema: yup.number().typeError('this must be a number').required(),

    stringSchema: yup.string().required(),

    numSchema: yup.number().typeError('this must be a number').required(),

    categorySchema: yup.mixed().oneOf(['Emergency', 'Extra', 'Steward']),

    numPositiveCSV: yup
      .string()
      .required()
      .test('is this csv', 'must be comma separated numbers', (x) => {
        // TODO: validate that array length of weights == moments
        if (!x) {
          return false
        }

        const isNumber = (num: any) => {
          yup.number().required().positive().validateSync(num)
        }

        try {
          x.split(',').map((y) => isNumber(y))
          return true
        } catch (e) {
          return false
        }
      }),
  },
}
