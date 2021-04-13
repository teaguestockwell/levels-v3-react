import {CargoStore} from '../hooks/cargo_store'
export const ConsoleLogger = () => {
  const cargoStore = CargoStore((state) => state)
  console.table(Array.from(cargoStore.cargoMap.values()))
  console.log(cargoStore)
  return <div></div>
}
