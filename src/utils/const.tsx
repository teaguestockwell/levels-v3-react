import {QueryClient} from 'react-query'
import * as yup from 'yup'

export const queryClient = new QueryClient()

const validateNumPositive = (num: any) => {
  return yup.number().required().positive().validateSync(num)
}

export const Const = {
  PATH: {
    MAC_OUTLINE: 'M26.2222 2H6.77778C5.25 2 4 3.25 4 4.77778V24.2222C4 25.75 5.25 27 6.77778 27H26.2222C27.75 27 29 25.75 29 24.2222V4.77778C29 3.25 27.75 2 26.2222 2ZM6.77778 24.2222V4.77778H15.1111V24.2222H6.77778ZM26.2222 24.2222H17.8889V14.5H26.2222V24.2222ZM26.2222 11.7222H17.8889V4.77778H26.2222V11.7222Z',
    GLOSSARY_OUTLINE: 'M9.11111 19.5H18.0556V22H9.11111V19.5ZM9.11111 14.5H21.8889V17H9.11111V14.5ZM9.11111 9.5H21.8889V12H9.11111V9.5ZM24.4444 4.5H19.1033C18.5667 3.05 17.1611 2 15.5 2C13.8389 2 12.4333 3.05 11.8967 4.5H6.55556C6.37667 4.5 6.21056 4.5125 6.04444 4.55C5.54611 4.65 5.09889 4.9 4.75389 5.2375C4.52389 5.4625 4.33222 5.7375 4.20444 6.0375C4.07667 6.325 4 6.65 4 7V24.5C4 24.8375 4.07667 25.175 4.20444 25.475C4.33222 25.775 4.52389 26.0375 4.75389 26.275C5.09889 26.6125 5.54611 26.8625 6.04444 26.9625C6.21056 26.9875 6.37667 27 6.55556 27H24.4444C25.85 27 27 25.875 27 24.5V7C27 5.625 25.85 4.5 24.4444 4.5ZM15.5 4.1875C16.0239 4.1875 16.4583 4.6125 16.4583 5.125C16.4583 5.6375 16.0239 6.0625 15.5 6.0625C14.9761 6.0625 14.5417 5.6375 14.5417 5.125C14.5417 4.6125 14.9761 4.1875 15.5 4.1875ZM24.4444 24.5H6.55556V7H24.4444V24.5Z',
    HELP_OUTLINE: 'M15.25 22H17.75V19.5H15.25V22ZM16.5 2C9.6 2 4 7.6 4 14.5C4 21.4 9.6 27 16.5 27C23.4 27 29 21.4 29 14.5C29 7.6 23.4 2 16.5 2ZM16.5 24.5C10.9875 24.5 6.5 20.0125 6.5 14.5C6.5 8.9875 10.9875 4.5 16.5 4.5C22.0125 4.5 26.5 8.9875 26.5 14.5C26.5 20.0125 22.0125 24.5 16.5 24.5ZM16.5 7C13.7375 7 11.5 9.2375 11.5 12H14C14 10.625 15.125 9.5 16.5 9.5C17.875 9.5 19 10.625 19 12C19 14.5 15.25 14.1875 15.25 18.25H17.75C17.75 15.4375 21.5 15.125 21.5 12C21.5 9.2375 19.2625 7 16.5 7Z',
    ADMIN_OUTLINE: 'M21.6117 17.9817L12.5317 8.90167C13.4617 6.56167 12.9817 3.80167 11.0917 1.90167C8.79167 -0.398329 5.21167 -0.60833 2.66167 1.25167L6.50167 5.10167L5.08167 6.51167L1.25167 2.68167C-0.60833 5.22167 -0.398329 8.81167 1.90167 11.1017C3.76167 12.9617 6.47167 13.4517 8.79167 12.5817L17.9017 21.6917C18.2917 22.0817 18.9217 22.0817 19.3117 21.6917L21.6117 19.3917C22.0117 19.0117 22.0117 18.3817 21.6117 17.9817ZM18.6117 19.5817L9.15167 10.1217C8.54167 10.5717 7.86167 10.8417 7.15167 10.9417C5.79167 11.1417 4.36167 10.7317 3.32167 9.69167C2.37167 8.75167 1.93167 7.49167 2.00167 6.25167L5.09167 9.34167L9.33167 5.10167L6.24167 2.01167C7.48167 1.94167 8.73167 2.38167 9.68167 3.32167C10.7617 4.40167 11.1717 5.89167 10.9217 7.28167C10.8017 7.99167 10.5017 8.65167 10.0417 9.24167L19.4917 18.6917L18.6117 19.5817Z',
    CAR_FILL: 'M25.2273 5H21.8182V2.5C21.8182 1.125 20.5909 0 19.0909 0H2.72727C1.22727 0 0 1.125 0 2.5V13.75C0 15.125 1.22727 16.25 2.72727 16.25C2.72727 18.325 4.55455 20 6.81818 20C9.08182 20 10.9091 18.325 10.9091 16.25H19.0909C19.0909 18.325 20.9182 20 23.1818 20C25.4455 20 27.2727 18.325 27.2727 16.25H28.6364C29.3864 16.25 30 15.6875 30 15V10.8375C30 10.3 29.8091 9.775 29.4545 9.3375L26.3182 5.5C26.0591 5.1875 25.65 5 25.2273 5ZM6.81818 17.5C6.06818 17.5 5.45455 16.9375 5.45455 16.25C5.45455 15.5625 6.06818 15 6.81818 15C7.56818 15 8.18182 15.5625 8.18182 16.25C8.18182 16.9375 7.56818 17.5 6.81818 17.5ZM25.2273 6.875L27.9 10H21.8182V6.875H25.2273ZM23.1818 17.5C22.4318 17.5 21.8182 16.9375 21.8182 16.25C21.8182 15.5625 22.4318 15 23.1818 15C23.9318 15 24.5455 15.5625 24.5455 16.25C24.5455 16.9375 23.9318 17.5 23.1818 17.5Z',
    CHART_FILL: 'M19 2H5C3.9 2 3 2.9 3 4V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V4C21 2.9 20.1 2 19 2ZM8 16C7.45 16 7 15.55 7 15V12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12V15C9 15.55 8.55 16 8 16ZM12 16C11.45 16 11 15.55 11 15V14C11 13.45 11.45 13 12 13C12.55 13 13 13.45 13 14V15C13 15.55 12.55 16 12 16ZM12 11C11.45 11 11 10.55 11 10C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 10.55 12.55 11 12 11ZM16 16C15.45 16 15 15.55 15 15V7C15 6.45 15.45 6 16 6C16.55 6 17 6.45 17 7V15C17 15.55 16.55 16 16 16Z',
  },
  HEIGHT: {
    APP_BAR: '130px',
    APP_BAR_NUM: 50,
    BOTTOM_NAV_BAR: '60px',
  },
  COLORS: {
    TXT_DISABLED: '#C5C5C5',
    TXT_RED: '#A40606',
  },
  BOX_SHADOW: '0px 2px 8px rgba(0, 0, 0, 0.1',
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
      .test('is this csv', 'this must be comma separated numbers of the same length', (x) => {
        // TODO: validate that array length of weights == moments
        if (!x) {
          return false
        }

        try {
          const nums = x.split(',')
          if(!nums.length){return false}
          nums.map((y) => validateNumPositive(y))
          return true
        } catch (e) {
          return false
        }
      }),
  },

}