/* eslint-disable @typescript-eslint/no-unused-vars */
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'
import {UserAirSelect} from '../components/user_air_select'
import {AdminAirSelect} from '../components/admin_air_select'
import {Glossary} from '../pages/glossary'
import {Help} from '../pages/help'
import { useMemo, useRef, useState } from "react"
import { useSize } from "../hooks/use_size"
import { MobileNav } from './mobile_nav'

export const DynamicMainNav = () => {
  const [pageName, setPageName] = useState('%MAC')
  const {width, height} = useSize()
  const isMobile = width > 750 ? false :true
  
  const mac = useRef(<Mac />).current
  const glossary = useRef(<Glossary />).current
  const admin = useRef(<Admin />).current
  const help = useRef(<Help />).current
  const userAirSelect = useRef(<UserAirSelect />).current
  const adminAirSelect = useRef(<AdminAirSelect />).current

  const getPage = () => {
    switch (pageName) {
      case '%MAC': return mac
      case 'Admin': return admin
      case 'Help': return help
      case 'Glossary': return glossary
      default: return mac
    }
  }

  return useMemo(() => {
    if(isMobile) {
      return <MobileNav
        page={getPage()}
        pageName={pageName}
        setPage={(x) => setPageName(x)}
        userAirSelect={userAirSelect}
        adminAirSelect={adminAirSelect}
      />
    }

    return <div>Desktop</div>
  },[pageName, isMobile])
}