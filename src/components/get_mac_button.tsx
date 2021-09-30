import {getUserAir, useCargos} from '../hooks/user_store'
import {getPerMac} from '../utils/util'
import {Modal, Table } from 'antd'
import { capitalizeFirst } from '../utils/util'
import { CargoCategory } from '../types'
import React from 'react'
import * as Types from '../types'
import { v4 } from 'uuid'

export const filterKeys = [
  'isValid',
  // 'category',
  'uuid',
]

const sortingOrder: Record<CargoCategory, number> = {
  [CargoCategory.BasicAircraft]: 0,
  [CargoCategory.Tank]: 1,
  [CargoCategory.Steward]: 2,
  [CargoCategory.Emergency]: 3,
  [CargoCategory.Extra]: 4,
  [CargoCategory.User]: 5,
}

export const ModalOpen = ({perMac, cb}: {perMac: Types.PercentMac, cb: () => void}) => {
  perMac.items.sort((a,b) => {
    if(a.category === b.category) {
      return a.name.localeCompare(b.name)
    }
    return sortingOrder[a.category] - sortingOrder[b.category]
  })

  const getCol = (t:string) => <div style={{width: 100, textAlign: 'center'}}>{t}</div>
  

  return <Modal 
  title="Show Work"
  bodyStyle={{paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 15}}
  visible={true}
  footer={null}
  closable={true}
  onCancel={() => cb()}
  width="100%"
  centered
>
  <Table
    key={v4()}
    style={{paddingTop: 0}} 
    pagination={false}
    columns={
      Object.keys(perMac.items[0])
      .filter(k => !filterKeys.includes(k))
      .map(k => ({
        title: capitalizeFirst(k),
        dataIndex: k,
        key: k,
      }))
    }
    dataSource={perMac.items}
    scroll={{x: true}}
  />
  <div style={{marginLeft: 10, marginRight: 10}}>
  <div style={{overflowX: 'auto', display: 'flex', flexDirection: 'column', marginTop: 30}}>
    <div style={{textAlign: 'center', width: '100%', fontWeight: 600, fontSize: 18}}>Balance Arm</div>

    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
      {getCol('Balance Arm')}
      {getCol('=')}
      {getCol('Moment')}
      {getCol('/')}
      {getCol('Total Weight')}
    </div>

    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
      {getCol(perMac.balArm)}
      {getCol('=')}
      {getCol(perMac.momentGrandTotal)}
      {getCol('/')}
      {getCol(perMac.weightGrandTotal)}
    </div>
  </div>

  <div style={{overflowX: 'auto', display: 'flex', flexDirection: 'column', marginTop: 30}}>
    <div style={{textAlign: 'center', width: '100%', fontWeight: 600, fontSize: 18}}>Mean Aerodynamic Chord %</div>

    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
      {getCol('MAC%')}
      {getCol('=')}
      {getCol('Balance Arm')}
      {getCol('-')}
      {getCol('LEMAC')}
      {getCol('/')}
      {getCol('MAC')}
    </div>

    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
      {getCol(perMac.percentMacPercent)}
      {getCol('=')}
      {getCol(perMac.balArm)}
      {getCol('-')}
      {getCol(perMac.lemac)}
      {getCol('/')}
      {getCol(perMac.mac)}
    </div>
  </div>
  </div>

  
</Modal>
}

export const GetMacButton = () => {
  const cargos = useCargos()
  const isCargoValid = cargos.every((c) => c.isValid)
  const air = getUserAir()
  const calculation = isCargoValid ? getPerMac(air, cargos) : null
  const [open, setOpen] = React.useState(false)
  const text =  isCargoValid ? `Show Work: ${calculation?.percentMacPercent}` : '%MAC: Invalid'

  const onClick = () => {
    if(isCargoValid){
      setOpen(true)
    }
  }

  return (
    <>
    <div style={{marginTop: 50, marginBottom: 60, display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
      <div
      className="hover-button"
      onClick={onClick}
        style={{
          background: '#06BA7F',
          color: '#fff',
          borderRadius: 45,
          width: 'fit-content',
          paddingLeft: 20,
          paddingRight: 20,
          height: 60,
          overflowWrap: 'break-word',
          cursor: isCargoValid ? 'pointer' : 'not-allowed',
          textAlign: 'center',
          lineHeight: '60px',
        }}
      >{text}</div>
    </div>
    {
      open && calculation && <ModalOpen perMac={calculation} cb={() => setOpen(false)} />
    }
    </>
  )
}
