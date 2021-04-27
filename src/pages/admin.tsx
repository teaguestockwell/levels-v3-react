import {JsonTable} from '../components/json_table'
import { Menu } from "antd"
import { useState } from "react"
import {MenuInfo} from 'rc-menu/lib/interface'
import { v4 } from 'uuid'
import SubMenu from 'antd/lib/menu/SubMenu'
import { getAir } from '../hooks/air_store'


export const Admin = () => {
  const [ep, setEP] = useState('cargo')

  const onClick = (menuInfo: MenuInfo) => {
    const newEP = String(menuInfo.key)
    console.log('ep clicked: ' + newEP)
    setEP(newEP)
  }

  return <>
    <Menu
    mode="horizontal"
    onClick={onClick}
    selectedKeys={[ep]}
  >
    <Menu.Item key={'aircraft'}>{'Aircrafts'}</Menu.Item>
    <Menu.Item key={'cargo'}>{'Cargos'}</Menu.Item>
    <Menu.Item key={'tank'}>{'Tanks'}</Menu.Item>
    <Menu.Item key={'user'}>{'Users'}</Menu.Item>
    <Menu.Item key={'glossary'}>{'Glossarys'}</Menu.Item>
    <Menu.Item key={'config'}>{'Configs'}</Menu.Item>
    <SubMenu key={ep} title={'Cargo in Config'}>
       {getAir().configs.map(c => <SubMenu key={'configCargo?'} title={'All Configs'}>)}
    </SubMenu>


  </Menu>

  <JsonTable ep={ep} key={v4()}/>
  </>

}
