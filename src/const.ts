import {Config} from './types/aircraftDeep'
export const Const = {
  MAX_FORM_LENGTH: 48,
  INT_RULES: [
    {
      max: 16,
    },
    {
      required: true,
    },
    {
      pattern: new RegExp(/^\d+$/),
      message: 'must be a positive whole number',
    },
  ],
  NUMERIC_RULES: [
    {
      max: 16,
    },
    {
      required: true,
    },
    {
      pattern: new RegExp(/^\d*(\.\d+)?$/),
      message: 'must be a positive number',
    },
  ],
  NAME_RULES: [
    {
      max: 48,
    },
    {
      required: true,
    },
    {
      whitespace: true,
    },
  ],
  noConfig: {configId: 0, configCargos: [], name: 'No Config', aircraftId: 0}
}
