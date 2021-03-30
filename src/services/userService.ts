import axios from 'axios'
import { Aircraft } from '../types/aircraft'
export const UserService = {
  getNAircraft: async (): Promise<Map<number, Aircraft>> => {
    const aircrafts: Aircraft[] = (await axios.get(process.env.API_BASE_URL as string)).data
    const ret = new Map<number,Aircraft>()
    aircrafts.forEach(air => ret.set(air.id,air))
    return ret
  },
  getGeneral: async () => {

  }
}