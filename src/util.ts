import {Const} from './const'
export const Util = {
  /** if string is > max length cut it and add ... */
  cut: (x: any): string => {
    return x.toString().length > Const.MAX_FORM_LENGTH
      ? x.toString().substring(0, Const.MAX_FORM_LENGTH - 3) + '...'
      : x.toString()
  },
  /** validate that value < x */
  isLessThan: async (value: any, x:number) => {
    if (!value) {
    } // let other rules handle empty string case
    else if (value > x) {
      throw new Error()
    }
  },
  /** validate that value > x */
  isGreaterThan: async (value: any, x: number) => {
      if (!value) {
      } // let other rules handle empty string case
      else if (value < x) {
        throw new Error()
      }
    },
  formatDate: (date: Date) => {

    const get2SignificantDigits = (num:number):string => {
      return num.toString().length === 2 ? num.toString() : '0' + num.toString()
    }

    const year = date.getUTCFullYear()
    const month = get2SignificantDigits(date.getUTCMonth() + 1) // who made this zero based? nerd
    const day = get2SignificantDigits(date.getUTCDate())
    const hour = get2SignificantDigits(date.getUTCHours())
    const min = get2SignificantDigits(date.getUTCMinutes())
    return `${year}-${month}-${day} ${hour}:${min} Zulu`
  }
}
