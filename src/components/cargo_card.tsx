import { getUserCargos, useCargoMapSize, useConfigName} from "../hooks/user_store"
import {Row, Col, Collapse, Divider} from 'antd'
import { ConfigSelect } from "./config_select"
import { AddASelect } from "./add_a_select"
import { Category } from "../types/aircraftDeep"
import { CargoEditRow } from "./cargo_edit_button"
import { v4 } from "uuid"

const {Panel} = Collapse

const buttons = <>
<Row justify="center" style={{
  padding: '0px 4px 0px 4px',
  textAlign: 'center',
}}>
  <Col span={24} style={{}}>
    <ConfigSelect/>
  </Col>
</Row>
<Row justify="center" style={{
  padding: '0px 4px 0px 4px',
  textAlign: 'center',
}}>
  <Col span={24} style={{paddingLeft: '10px', textAlign: 'center'}}>
    <AddASelect/>
  </Col>
</Row>
</>

export const CargoCard = () => {
  const configName = useConfigName()
  useCargoMapSize()
  const cargos = getUserCargos()
  const cargoContainsCustomCargo = cargos.some(c => c.category === Category.User)
  const configIsEmpty = configName === 'No Config' ? true : false

  
  const getCargosAtCat = (cat: Category) => {
    return cargos
    .filter(c => c.category === cat)
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(c => <CargoEditRow key={c.uuid} uuid={c.uuid}/>)
  }

  return <div
    style={{
      margin: '0px 10px 0px 10px',
      paddingBottom: 15
    }}
  >
    {buttons}

    { (!configIsEmpty || cargoContainsCustomCargo)  &&
      <Divider style={{margin: 10}}/>
    }

    <Collapse expandIconPosition={'right'} accordion bordered={false} style={{padding: '0px 4px'}}>

      { !configIsEmpty &&
        <Panel key={v4()} header={`${configName} Cargo`}>
        <Collapse expandIconPosition={'right'} accordion bordered={false}>

          <Panel key={v4()} header={`Steward Cargo`}>
            {getCargosAtCat(Category.Steward)}
          </Panel>  

          <Panel key={v4()} header={`Emergency Cargo`}>
          {getCargosAtCat(Category.Emergency)}
          </Panel> 

          <Panel key={v4()} header={`Extra Cargo`}>
          {getCargosAtCat(Category.Extra)}
          </Panel>  

        </Collapse>
      </Panel>
      }

      { cargoContainsCustomCargo  && // is there more than tanks and chart c?
        <Panel key={v4()} header={`Custom Cargo`}>
          {getCargosAtCat(Category.User)}
        </Panel> 
      }

    </Collapse>
  </div>
}

