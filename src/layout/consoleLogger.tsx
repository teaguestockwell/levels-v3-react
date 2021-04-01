import { CargoStore } from '../store/cargoStore'
export const ConsoleLogger  = () => {
   const cargoStore = CargoStore((state) => state)
   console.log(cargoStore)
  return <div></div>
}