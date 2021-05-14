import {useIsWidthGT} from '../hooks/use_is_width_gt'
import {DesktopNav} from './desktop_nav'
import {MobileNav} from './mobile_nav'
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'
import {GlossaryList} from '../pages/glossary_list'
import {Help} from '../pages/help'
import {AppBar} from './app_bar'
import {AdminAirSelect} from '../components/admin_air_select'
import {ClientServerSync} from '../components/client_server_sync'
import {UserAirSelect} from '../components/user_air_select'
import {
  ContainerFilled,
  LayoutFilled,
  ToolFilled,
  QuestionCircleFilled,
} from '@ant-design/icons'
import {AdminServerSync} from '../components/admin_server_sync'

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
export const persistentPages: {[key: string]: JSX.Element} = {
  '%MAC': <Mac />,
  Glossary: <GlossaryList />,
  Admin: <Admin />,
  Help: <Help />,
}
export const mobileNav = <MobileNav />
export const desktopNav = <DesktopNav />
const adminAppBar = (
  <AppBar select={<AdminAirSelect />} sync={<AdminServerSync />} />
)
const userAppBar = (
  <AppBar select={<UserAirSelect />} sync={<ClientServerSync />} />
)
export const getAppBar = (pageName: string) =>
  pageName !== 'Admin' ? userAppBar : adminAppBar

export const DynamicMainNav = () => {
  const {isWidthGT} = useIsWidthGT()

  // width > 1200: side nav with drawer init open
  if (!isWidthGT) {
    return mobileNav
  }

  // bottom nav bar
  return desktopNav
}
