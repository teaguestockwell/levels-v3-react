import {
  getUserCargos,
  useCargoMapSize,
  useConfigName,
} from '../hooks/user_store'
import {Collapse } from 'antd'
import {ConfigSelect} from './config_select'
import {AddASelect} from './add_a_select'
import  * as Types from '../types'
import {CargoEditRow} from './cargo_edit_button'
import {v4} from 'uuid'
import {CardShadow} from './card_shadow'

const {Panel} = Collapse

export const CargoCard = () => {
  const configName = useConfigName()
  useCargoMapSize()
  const cargos = getUserCargos()
  const cargoContainsCustomCargo = cargos.some(
    (c) => c.category === Types.CargoCategory.User
  )
  const configIsEmpty = configName === 'No Config' ? true : false

  const getCargosAtCat = (cat: Types.CargoCategory) => {
    return cargos
      .filter((c) => c.category === cat)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => <CargoEditRow key={c.uuid} uuid={c.uuid} />)
  }

  return (
    <div
      style={{
        paddingBottom: 14,
      }}
    >
      <CardShadow style={{borderRadius: 0, paddingBottom: 10}}>
        <ConfigSelect />
        <div style={{marginTop: 10, marginBottom: 0, borderTop: '1px solid #F1F1F1'}}/>
        <AddASelect />
      </CardShadow>

      <CardShadow style={{borderRadius: 0, paddingTop: 10}}>
      <Collapse
        expandIconPosition={'right'}
        accordion
        bordered={false}
        style={{padding: '0px 4px'}}
        >
        {!configIsEmpty && (
          <Panel key={v4()} header={`${configName} Cargo`}>
            <Collapse expandIconPosition={'right'} accordion bordered={false}>
              <Panel key={v4()} header={`Steward Cargo`}>
                {getCargosAtCat(Types.CargoCategory.Steward)}
              </Panel>

              <Panel key={v4()} header={`Emergency Cargo`}>
                {getCargosAtCat(Types.CargoCategory.Emergency)}
              </Panel>

              <Panel key={v4()} header={`Extra Cargo`}>
                {getCargosAtCat(Types.CargoCategory.Extra)}
              </Panel>
            </Collapse>
          </Panel>
        )}

        {cargoContainsCustomCargo && ( // is there more than tanks and chart c?
          <Panel key={v4()} header={`Custom Cargo`}>
            {getCargosAtCat(Types.CargoCategory.User)}
          </Panel>
        )}
      </Collapse>
    </CardShadow>
    </div>
  )
}
