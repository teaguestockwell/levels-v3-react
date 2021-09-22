/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'
import {GlossaryList} from '../pages/glossary_list'
import {Help} from '../pages/help'
import {Const} from '../utils/const'
import {MaxContent} from '../components/max_content'
import {
  Home,
  Glossary,
  Settings
} from '../components/icons'
/** if x===y return 'active' else return 'inactive' */
export const getNavItemStyle = (x: string, y: string) =>
  x === y ? 'active' : 'inactive'

export const pageNames = ['Home', 'Glossary', 'Help', 'Admin']

const svgPropsSelected = {
  width: 33,
  height: 33,
  viewBox: '0 0 33 33',
  webkitfilter: 'drop-shadow( 0px 2px 4px rgba(255, 255, 255, .25))',
  filter: 'drop-shadow( 0px 2px 4px rgba(255, 255, 255, .25))',
} as any

const svgProps = {
  width: 33,
  height: 33,
  viewBox: '0 0 33 33',
} as any

export const enabled = '#08D290'
export const disabled = '#000'

/** lookup map for at 'active' || 'inactive' navigation icons styles */
export const navIcons: {[key: string]: any} = {
  inactive: {
    'Home': <Home color={disabled}/>,
    Glossary: <Glossary color={disabled}/>,
    Admin: <Settings color={disabled}/>,
    Help: (
      <svg data-testid="help nav icon" {...svgProps}>
        <path d={Const.PATH.HELP_OUTLINE} fill={disabled} />
      </svg>
    ),
  },
  active: {
    'Home': <Home color={enabled}/>,
    Glossary: <Glossary color={enabled}/>,
    Admin: <Settings color={enabled}/>,
    Help: (
      <svg data-testid="help nav icon" {...svgPropsSelected}>
        <path d={Const.PATH.HELP_OUTLINE} fill={enabled}  />
      </svg>
    ),
  },
}

/** globally scoped components that persist between layouts */
export const persistentPages: {[key: string]: JSX.Element} = {
  'Home': <MaxContent children={<Mac />} />,
  Glossary: <MaxContent children={<GlossaryList />} />,
  Admin: <Admin />,
  Help: <MaxContent children={<Help />} />,
}
