import { Menu } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import { useState } from "react"
import { AircraftDeep } from "../types/aircraftDeep"
import {MenuInfo} from 'rc-menu/lib/interface'
import { JsonTable } from "./json_table"
import { v4 } from "uuid"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const AdminNav = ({air}:{air:AircraftDeep}) => {
  const [ep,setEp] = useState('aircraft')

  const onClick = (menuInfo: MenuInfo) => {
    const newEP = String(menuInfo.key)

    if(newEP === 'aircraft'){
      setEp(newEP)
      return
    }

    if(newEP.includes('configCargo')){
      setEp(`${newEP}&aircraftId=${air.aircraftId}`)
      return
    }

    setEp(`${newEP}?aircraftId=${air.aircraftId}`)
  }

  return <>
  <Menu
  mode="horizontal"
  onClick={onClick}
  selectedKeys={[ep]}
>
  <Menu.Item key={'aircraft'}>{'All Aircraft'}</Menu.Item>
  <Menu.Item key={'cargo'}>{'Cargos'}</Menu.Item>
  <Menu.Item key={'glossary'}>{'Glossarys'}</Menu.Item>
  <Menu.Item key={'tank'}>{'Tanks'}</Menu.Item>
  <Menu.Item key={'user'}>{'Users'}</Menu.Item>
  <Menu.Item key={'config'}>{'Configs'}</Menu.Item>
  <SubMenu title={'Cargos in Config'}>
   {air.configs.map(c => 
    <Menu.Item key={`configCargo?configId=${c.configId}`}>
      {c.name}
    </Menu.Item>
    )}
  </SubMenu> 
  </Menu>
  <JsonTable ep={ep} key={v4()}/>
  </>
}