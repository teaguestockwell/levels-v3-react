import {Const} from '../utils/const'
import {
  navIcons,
  pageNames,
  getNavItemStyle,
  persistentPages,
  enabled, disabled
} from './dynamic_main_nav'
import {getUserActions, usePageName} from '../hooks/user_store'
import {MaxContent} from '../components/max_content'

const cs = getUserActions()
/** 
@param page page component to be rendered
@param pageName pageName
@param setPage callback used to change pages
@param appBar top nav component
*/
export const MobileNav = () => {
  const pageName = usePageName()

  return (
    // since bottom nav bar sits on top, add padding to make viewport scroll to uncover
    <div
      style={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
      data-testid="mobile-nav"
    >
      {persistentPages[pageName]}
      <div
        className='mobile-nav'
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1,
          height: Const.HEIGHT.BOTTOM_NAV_BAR,
          backgroundColor: '#fff',
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.15)',
          MozBoxShadow: '0px -3px 10px rgba(0, 0, 0, 0.15)',
          WebkitBoxShadow: '0px -3px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <MaxContent>
          <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 14, marginRight: 14}}>
            {pageNames.map((x) => (
                <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  cursor: pageName === x ? 'default' : 'pointer',
                }}
                  key={x}
                  onClick={() => cs.setPageName(x)}
                >
                {navIcons[getNavItemStyle(x, pageName)][x]}
                <div style={{color: x === pageName ? enabled : disabled}}>{x}</div>
              </div>
            ))}
          </div>
          </MaxContent>
      </div>
    </div>
  )
}
