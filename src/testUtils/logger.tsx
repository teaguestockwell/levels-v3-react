/* eslint-disable @typescript-eslint/no-unused-vars */
import {userStore} from '../hooks/user_store'
export const Logger = () => {
  const cargoStore = userStore((state) => state)
  //console.table(Array.from(cargoStore.cargoMap.values()))
  //console.log(cargoStore)
  return <div></div>
}
