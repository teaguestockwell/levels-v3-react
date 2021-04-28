//this component wraps all the state within the admin portal to poll the api
// it is separate from mac air select because it syncs with server state

import { Button, Dropdown, Menu } from "antd"
import { useMemo, useState } from "react"
import { UsePollingAtEP } from "../hooks/use_admin_polling"
import { AircraftDeep } from "../types/aircraftDeep"
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import { AdminNav } from "../nav/admin_nav"

export const Admin = () => {
  const {data} = UsePollingAtEP('aircraft', 5000)
  const [air, setAir] = useState<AircraftDeep>()

  const loading = <div>loading state</div>
  const error = <div>error state</div>
  const empty = <div>empty state</div>

  const onAirChange = (menuInfo: MenuInfo) => {
    const newKey = Number(menuInfo.key)
    const newAir = data.find((x: any) => x.aircraftId === newKey) as AircraftDeep
    setAir(newAir)
  }

  const airSelect = useMemo(()=>{
    if (!data){return loading}
  
    if (data.msg) {return error}
  
    if (data.length === 0) {return empty}

    if(!air){setAir(data[0]);return loading}

    if(!data.find((a: any) => a.aircraftId === air?.aircraftId)){
      setAir(data[0]); return loading
    }

    const menu = <Menu 
    onClick={(x) => onAirChange(x)}>
      {data.map((a: AircraftDeep) => (
        <Menu.Item key={a.aircraftId}>{a.name}</Menu.Item>
      ))}
    </Menu>

    return <>
    <Dropdown 
      overlay={menu} 
      trigger={['click']}
    >
    <Button>
      {(air as AircraftDeep).name}
      <DownOutlined />
    </Button>
  </Dropdown>
  <AdminNav air={air} key={air.aircraftId}/>
  </>

  },[data,air?.aircraftId])

  return airSelect
}