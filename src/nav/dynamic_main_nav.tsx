import {useMemo, useState} from 'react'
import {useSize} from '../hooks/use_size'
import {DesktopNav} from './desktop_nav'
import {MobileNav} from './mobile_nav'
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'
import {GlossaryList} from '../pages/glossary_list'
import {Help} from '../pages/help'
import {AppBar} from './app_bar'
import { AdminAirSelect } from '../components/admin_air_select'
import { ClientServerSync } from '../components/client_server_sync'
import { UserAirSelect } from '../components/user_air_select'
import {
  ContainerFilled,
  LayoutFilled,
  ToolFilled,
  QuestionCircleFilled,
} from '@ant-design/icons'

const darkIconStyle = {
  color: '#737373',
  height: '30px',
  fontSize: '175%',
}

const lightIconStyle = {
  color: 'white',
  height: '30px',
  fontSize: '175%',
}

/** if x===y return 'active' else return 'inactive' */
export const getNavItemStyle = (x: string, y: string) =>
  x === y ? 'active' : 'inactive'

export const pageNames = ['%MAC', 'Glossary', 'Help', 'Admin']

/** lookup map for at 'active' || 'inactive' navigation icons styles */
export const navIcons: {[key: string]: any} = {
  inactive: {
    '%MAC': <LayoutFilled style={darkIconStyle} />,
    Glossary: <ContainerFilled style={darkIconStyle} />,
    Admin: <ToolFilled style={darkIconStyle} />,
    Help: <QuestionCircleFilled style={darkIconStyle} />,
  },
  active: {
    '%MAC': <LayoutFilled style={lightIconStyle} />,
    Glossary: <ContainerFilled style={lightIconStyle} />,
    Admin: <ToolFilled style={lightIconStyle} />,
    Help: <QuestionCircleFilled style={lightIconStyle} />,
  },
}

/** globally scoped components that persist between layouts */
export const persistentComponents: {[key: string]: JSX.Element} = {
  '%MAC': <Mac />,
  Glossary: <GlossaryList />,
  Admin: <Admin />,
  Help: <Help />,
  AdminAppBar: <AppBar select={<AdminAirSelect/>} sync={null} />,
  UserAppBar: <AppBar select={<UserAirSelect/>} sync={<ClientServerSync/>} />,
}

export const DynamicMainNav = () => {
  const [pageName, setPageName] = useState('%MAC')
  const {width} = useSize()
  const breakPoint =
    width > 750 ? 'desktop' : 'mobile'

  return useMemo(() => {
    const props = {
      page: persistentComponents[pageName],
      pageName: pageName,
      setPage: setPageName,
      appBar:
        pageName !== 'Admin'
          ? persistentComponents['UserAppBar']
          : persistentComponents['AdminAppBar'],
    }

    // width > 1200: side nav with drawer init open
    if (breakPoint === 'desktop') {
      return <DesktopNav {...props}/>
    }

    // bottom nav bar
    return <MobileNav {...props} />
  }, [pageName, breakPoint])
}
