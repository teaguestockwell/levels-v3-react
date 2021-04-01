export const Const = {
  MAX_FORM_LENGTH: 16,
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
      max: 16,
    },
    {
      required: true,
    },
    {
      whitespace: true,
    },
  ]

}
