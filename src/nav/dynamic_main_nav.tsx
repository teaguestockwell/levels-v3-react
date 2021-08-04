/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
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
import {AdminServerSync} from '../components/admin_server_sync'
import {Const} from '../utils/const'
import {MaxContent} from '../components/max_content'

/** if x===y return 'active' else return 'inactive' */
export const getNavItemStyle = (x: string, y: string) =>
  x === y ? 'active' : 'inactive'

export const pageNames = ['%MAC', 'Glossary', 'Help', 'Admin']

const svgPropsSelected = {
  width: 33,
  height: Const.HEIGHT.BOTTOM_NAV_BAR,
  viewBox: '0 0 33 33',
  webkitfilter: 'drop-shadow( 0px 2px 4px rgba(255, 255, 255, .25))',
  filter: 'drop-shadow( 0px 2px 4px rgba(255, 255, 255, .25))',
} as any

const svgProps = {
  width: 33,
  height: Const.HEIGHT.BOTTOM_NAV_BAR,
  viewBox: '0 0 33 33',
} as any

/** lookup map for at 'active' || 'inactive' navigation icons styles */
export const navIcons: {[key: string]: any} = {
  inactive: {
    '%MAC': (
      <svg data-testid="%MAC nav icon" {...svgProps}>
        <path d={Const.PATH.MAC_OUTLINE} fill={Const.COLORS.TXT_DISABLED} />
      </svg>
    ),
    Glossary: (
      <svg data-testid="glossary nav icon" {...svgProps}>
        <path
          d={Const.PATH.GLOSSARY_OUTLINE}
          fill={Const.COLORS.TXT_DISABLED}
        />
      </svg>
    ),
    Admin: (
      <svg data-testid="admin nav icon" {...{...svgProps, viewBox: '0 0 28 28'}}>
        <path d={Const.PATH.ADMIN_OUTLINE} fill={Const.COLORS.TXT_DISABLED} />
      </svg>
    ),
    Help: (
      <svg data-testid="help nav icon" {...svgProps}>
        <path d={Const.PATH.HELP_OUTLINE} fill={Const.COLORS.TXT_DISABLED} />
      </svg>
    ),
  },
  active: {
    '%MAC': (
      <svg data-testid="%MAC nav icon" {...svgPropsSelected}>
        <path d={Const.PATH.MAC_OUTLINE} fill="white" />
      </svg>
    ),
    Glossary: (
      <svg data-testid="glossary nav icon" {...svgPropsSelected}>
        <path d={Const.PATH.GLOSSARY_OUTLINE} fill="white" />
      </svg>
    ),
    Admin: (
      <svg data-testid="admin nav icon" {...{...svgPropsSelected, viewBox: '0 0 28 28'}}>
        <path d={Const.PATH.ADMIN_OUTLINE} fill="white" />
      </svg>
    ),
    Help: (
      <svg data-testid="help nav icon" {...svgPropsSelected}>
        <path d={Const.PATH.HELP_OUTLINE} fill="white" />
      </svg>
    ),
  },
}

/** globally scoped components that persist between layouts */
export const persistentPages: {[key: string]: JSX.Element} = {
  '%MAC': <MaxContent children={<Mac />} />,
  Glossary: <MaxContent children={<GlossaryList />} />,
  Admin: <Admin />,
  Help: <MaxContent children={<Help />} />,
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

export const DynamicMainNav = () => mobileNav
