import { useCargoMapSize, useConfigName, userStore } from "../hooks/user_store"
import {Row, Col, Collapse} from 'antd'
import { ConfigSelect } from "./config_select"
import { AddASelect } from "./add_a_select"
import { Category } from "../types/aircraftDeep"
import { CargoEditButton } from "./cargo_edit_button"
const {Panel} = Collapse


export const CargoCard = () => {
  const configName = useConfigName()
  useCargoMapSize()
  const cargos = Array.from(userStore.getState().cargoMap.values())

  const getCargosAtCat = (cat: Category) => {
    return cargos.filter(x => x.category === cat)
    .map(c => <CargoEditButton uuid={c.uuid} key={c.uuid}/>)
  }

  return <div
    style={{
      margin: '0px 10px 0px 10px',
      paddingBottom: 15
    }}
  >

    <Row justify="center" style={{
      padding: '0px 4px 15px 4px',
      textAlign: 'center',
    }}>
      <Col span={12} style={{paddingRight: '10px'}}>
        <ConfigSelect/>
      </Col>
      <Col span={12} style={{paddingLeft: '10px', textAlign: 'center'}}>
        <AddASelect/>
      </Col>
    </Row>

    <Collapse expandIconPosition={'right'}>

      <Panel key={'1'} header={`${configName} Cargos`}>
        <Collapse expandIconPosition={'right'}>

          <Panel key={'2'} header={`Steward Cargo`}>
            {getCargosAtCat(Category.Steward)}
          </Panel>  

          <Panel key={'3'} header={`Emergency Cargo`}>
          {getCargosAtCat(Category.Emergency)}
          </Panel> 

          <Panel key={'4'} header={`Extra Cargo`}>
          {getCargosAtCat(Category.Extra)}
          </Panel>  

        </Collapse>
      </Panel>

      <Panel key={'5'} header={`Custom Cargo`}>
        {getCargosAtCat(Category.User)}
      </Panel> 

    </Collapse>
  </div>
}

