import {Const} from './const'
export const Util = {
  /** if string is > max length cut it and add ... */
  cut: (x: any): string => {
    return x.toString().length > Const.MAX_FORM_LENGTH
      ? x.toString().substring(0, Const.MAX_FORM_LENGTH - 3) + '...'
      : x.toString()
  },
}
