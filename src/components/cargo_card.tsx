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
        marginLeft: 14,
        marginRight: 14,
        paddingBottom: 14,
      }}
    >
      <ConfigSelect />
      <AddASelect />

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
    </div>
  )
}
