import {TankRow} from './tank_row'
import {userStore, getUserAir} from '../hooks/user_store'
import * as Types from '../types'

export const TankList = () => {
  const air = getUserAir()
  const cargoStrings = Array.from(
    userStore.getState().cargoMap.values()
  ).filter((c) => c.category === Types.CargoCategory.Tank)

  return (
    
    // <div style={{display: 'flex',flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
    //   {air.tanks.map((tank, i) => (
    //       <TankRow
    //         style={{flex: '0 0 25%'}}
    //         tank={tank}
    //         cargoString={cargoStrings[i]}
    //         key={tank.tankId}
    //         />
    //   ))}
    // </div>

    <div style={{paddingRight: 10, display: 'flex', overflowX: 'auto'}}>
    {air.tanks.map((tank, i) => (

      <div style={{marginLeft: 10}} key={tank.tankId}>
        <TankRow
          tank={tank}
          cargoString={cargoStrings[i]}
          />
      </div>
    ))}
  </div>
  )
}
