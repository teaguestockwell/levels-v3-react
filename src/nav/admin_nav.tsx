import { Menu } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import { useState } from "react"
import { AircraftDeep } from "../types/aircraftDeep"
import {MenuInfo} from 'rc-menu/lib/interface'
import { JsonTable } from "../components/json_table"
import {DownOutlined} from '@ant-design/icons'

/* eslint-disable @typescript-eslint/no-unused-vars */
export const AdminNav = ({air}:{air:AircraftDeep}) => {
  const [ep,setEp] = useState('aircraft')

  const onClick = (menuInfo: MenuInfo) => {
    setEp(String(menuInfo.key))
  }
  
  const getFullEP = (newEP: string) => {
    if(newEP === 'aircraft'){
      return newEP
    }

    if(newEP.includes('configCargo')){
      return `${newEP}&aircraftId=${air.aircraftId}`

    }

    return `${newEP}?aircraftId=${air.aircraftId}`
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
  <SubMenu title={'Cargos in Config'} icon={<DownOutlined/>}>
   {air.configs.map(c => 
    <Menu.Item key={`configCargo?configId=${c.configId}`}>
      {c.name}
    </Menu.Item>
    )}
  </SubMenu> 
  </Menu>
  <JsonTable ep={getFullEP(ep)}/>
  </>
}