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
import { DesktopNav } from './desktop_nav'
import {
  ContainerFilled,
  LayoutFilled,
  ToolFilled,
  QuestionCircleFilled,
} from '@ant-design/icons'

export   const getIconStyle = (name: string, pageName:string) => ({
  color: name === pageName ? 'white' : '#737373',
  height: '30px',
  fontSize: '175%',
})

export const getIcon = (name: string, pageName:string) => {
  if (name === '%MAC') {
    return <LayoutFilled style={getIconStyle(name, pageName)} />
  }
  if (name === 'Admin') {
    return <ToolFilled style={getIconStyle(name, pageName)} />
  }
  if (name === 'Glossary') {
    return <ContainerFilled style={getIconStyle(name, pageName)} />
  }
  if (name === 'Help') {
    return <QuestionCircleFilled style={getIconStyle(name, pageName)} />
  }
  return null
}

export const getTextStyle = (name: string, pageName:string): any => ({
  color: name === pageName ? 'white' : '#737373',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
})

export const pages = ['%MAC', 'Glossary', 'Help', 'Admin']

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
    const props = {
      page: getPage(),
      pageName: pageName,
      setPage: (x:any) => setPageName(x),
      select: pageName !== 'Admin' ? userAirSelect : adminAirSelect
    }

    if(isMobile) {return <MobileNav {...props}/>}
    return <DesktopNav {...props}/>
  },[pageName, isMobile])
}