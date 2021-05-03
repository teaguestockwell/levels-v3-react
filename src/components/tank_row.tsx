import {Tank} from '../types/aircraftDeep'
import {getActionsCS} from '../hooks/cargo_store'
import {CargoString} from '../types/cargoString'
import {getCargoStringFromTank} from '../util'
import {getAir} from '../hooks/air_store'
import {Select} from 'antd'
import {Const} from '../const'

const {Option} = Select
const cs = getActionsCS()

export const TankRow = ({
  tank,
  cargoString,
}: {
  tank: Tank
  cargoString: CargoString
}) => {
  const weights = tank.weightsCSV.split(',')
  const onChange = (newWeight: string) => {
    // get new cargo string from tank with new index
    // to update fs && weightEA
    // override uuid
    const newIdx = weights.findIndex((w) => w === newWeight)
    const newCargoString = {
      ...getCargoStringFromTank({
        idx: newIdx,
        tank,
        momMultiplyer: getAir().momMultiplyer,
      }),
      uuid: cargoString.uuid,
    }

    cs.putCargos([newCargoString])
  }

  return (
    <Select
      onChange={onChange}
      defaultValue={weights[0]}
      style={{width: Const.SELECT_WIDTH}}
      showSearch
    >
      {weights.map((w) => (
        <Option value={w} key={w}>{`${tank.name}: ${w}`}</Option>
      ))}
    </Select>
  )
}
