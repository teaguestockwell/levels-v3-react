/* eslint-disable @typescript-eslint/no-unused-vars */
import {Tank} from '../types/aircraftDeep'
import {getActionsCS, useCargo} from '../hooks/cargo_store'
import {CargoString} from '../types/cargoString'
import {getCargoStringFromTank} from '../util'
import {getAir} from '../hooks/air_store'
import {Row, Select, Space} from 'antd'
import {Const} from '../const'
import {Liquid} from '@ant-design/charts'
import {Typography} from 'antd'
import {useMemo} from 'react'

const {Text} = Typography
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
  const currentWeight = useCargo(cargoString?.uuid)?.weightEA ?? 0
  const maxWeight = weights[weights.length - 1]
  const liquidConfig = {
    renderer: 'svg',
    autoFit: false,
    width: 100,
    height: 100,
    shape: 'rect',
    percent: Number(currentWeight) / Number(maxWeight),
    wave: {
      length: 128,
    },
    outline: {
      distance: 2,
      border: 2,
    },
    liquidStyle: {
      fill: '#736ADB',
      stroke: '#C4C4C4',
    },
    statistic: {
      content: '', //{
      //   customHtml: <Text style={{
      //     textAlign: 'center',
      //     color: 'black',
      //     //fontFamily: 'DM Sans',
      //     fontWeight: 'normal',
      //     fontSize: '12px',
      //     //lineHeight: '18px',
      //   }}>{`${tank.name}`}</Text>
      // }
    },
  } as any

  const liquid = (
    <div
      style={{
        width: 100,
        height: 100,
      }}
    >
      {process.env.IS_TEST ? (
        <div>chart</div>
      ) : (
        <Liquid {...liquidConfig}></Liquid>
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
        momMultiplyer: getAir().momMultiplyer,
      }),
      uuid: cargoString.uuid,
    }

    cs.putCargos([newCargoString])
  }

  const select = useMemo(() => {
    return (
      <Select
        onChange={onChange}
        defaultValue={currentWeight}
        style={{width: 100}}
        showSearch
      >
        {weights.map((w) => (
          <Option value={w} key={w}>
            {w}
          </Option>
        ))}
      </Select>
    )
  }, [])

  const name = (
    <Text
      style={{
        textAlign: 'center',
        color: '#7F7F7F',
        //fontFamily: 'DM Sans',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '18px',
      }}
    >
      {tank.name}
    </Text>
  )

  return (
    <div>
      <Row justify="center">{liquid}</Row>
      <div style={{paddingTop: '15px'}}>
        <Row justify="center">{select}</Row>
      </div>
      <div style={{paddingTop: '9px'}}>
        <Row justify="center">{name}</Row>
      </div>
    </div>
  )
}
