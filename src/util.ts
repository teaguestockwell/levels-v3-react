import {Const} from './const'
export const Util = {
  /** if string is > max length cut it and add ... */
  cut: (x:any):string => {
  return x.toString().length > Const.maxFormLength ?
   x.toString().substring(0,Const.maxFormLength-3) + '...' :
    x.toString()
  }
}
