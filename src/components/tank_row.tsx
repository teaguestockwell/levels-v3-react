
import {Tank} from '../types/aircraftDeep'
import {getUserActions, useCargo,getUserAir} from '../hooks/user_store'
import {CargoString} from '../types/cargoString'
import {getCargoStringFromTank} from '../utils/util'
import {Row, Select,Typography} from 'antd'
import { Gauge } from '@ant-design/charts'
import {useMemo, useState} from 'react'

const {Text} = Typography
const {Option} = Select
const cs = getUserActions()

export const TankRow = ({
  tank,
  cargoString,
}: {
  tank: Tank
  cargoString: CargoString
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const currentWeight = useCargo(cargoString?.uuid)?.weightEA ?? 0
  const weights = tank.weightsCSV.split(',')
  const maxWeight = weights[weights.length - 1]
  const liquidConfig = {
    percent: Number(currentWeight) / Number(maxWeight),
    range: { color: 'l(0) 0:#B7D9D7 1:#037C75'},
    indicator: null,
  } as any

  const liquid = (
    <div
      onClick={() => setIsEditing(!isEditing)}
      style={{
        width: 100,
        height: 100,
      }}
    >
      {process.env.IS_TEST ? (
        <div>chart</div>
      ) : (
        <Gauge {...liquidConfig}></Gauge>
      )}
    </div>
  )

  const onChange = (newWeight: string) => {
    // get new cargo string from tank with new index
    // to update fs && weightEA
    // override uuid
    const newIdx = weights.findIndex((w) => w === newWeight)
    const newCargoString = {
      ...getCargoStringFromTank({
        idx: newIdx,
        tank,
        momMultiplyer: getUserAir().momMultiplyer,
      }),
      uuid: cargoString.uuid,
    }

    cs.putCargos([newCargoString])
  }

  const options = useMemo(() => {
    return weights.map((w) => (
      <Option value={w} key={w}>
        {w}
      </Option>
    ))
  }, [weights])

  const select = (
    <Select
      data-testid={`${tank.name} select`}
      onChange={onChange}
      defaultValue={currentWeight}
      style={{textAlign: 'center', fontSize: 12, width: 60}}
      dropdownStyle={{textAlign: 'center'}}
      showSearch
      size='small'
      showArrow={false}
      bordered={isEditing}
      onDropdownVisibleChange={open => setIsEditing(open)}
      open={isEditing}
      showAction={['focus']}
      dropdownMatchSelectWidth={false}
    >
      {options}
    </Select>
  )

  const name = (
    <Text
      style={{
        textAlign: 'center',
        color: '#383838',
        fontWeight: 'normal',
        fontSize: '12px',
      }}
    >
      {tank.name}
    </Text>
  )


  return (
    <div style={{paddingTop:10, cursor: 'pointer'}}>
      <Row justify="center">{name}</Row>
      <Row justify="center" style={{marginTop: -5}}>{liquid}</Row>
      <Row justify="center" style={{marginTop: -36}}>{select}</Row>
    </div>
  )
}
