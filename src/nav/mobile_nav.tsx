/* eslint-disable @typescript-eslint/no-unused-vars */
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'
import { AppBar } from './appbar'
import {UserAirSelect} from '../components/user_air_select'
import { useRef, useState } from 'react'
import { AdminAirSelect } from '../components/admin_air_select'
import { Glossary } from '../pages/glossary'
import { Help } from '../pages/help'
import { BottomNav } from './bottom_nav'
import { Const } from '../const'


export const MobileNav = () => {
  const [page, setPage] = useState<'%MAC' | 'Glossary' | 'Admin' | 'Help'>('%MAC')
  
  const mac = useRef(<Mac/>).current
  const glossary = useRef(<Glossary/>).current
  const admin = useRef(<Admin/>).current
  const help = useRef(<Help/>).current
  const userAirSelect = useRef(<UserAirSelect/>).current
  const adminAirSelect = useRef(<AdminAirSelect/>).current

  const onClick = (newPage:string) => setPage(newPage as any)

  return <div style={{paddingBottom: Const.HEIGHT.BOTTOM_NAV_BAR}}>
    <AppBar select={page !== 'Admin' ? userAirSelect : adminAirSelect}/>
      
    {page === '%MAC' ? mac : null}
    {page === 'Glossary' ? glossary : null}
    {page === 'Admin' ? admin : null}
    {page === 'Help' ? help : null}

    <BottomNav onClick={onClick} page={page}/>
  </div>
}
