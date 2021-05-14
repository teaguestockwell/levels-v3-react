/* eslint-disable @typescript-eslint/no-unused-vars */
import {Const} from '../utils/const'
import {Button, Col, Row, Typography} from 'antd'
import {navIcons, pageNames, getNavItemStyle, getAppBar, persistentPages} from './dynamic_main_nav'
import { getActionsCS, usePageName } from '../hooks/cargo_store'

const cs = getActionsCS()
/** 
@param page page component to be rendered
@param pageName pageName
@param setPage callback used to change pages
@param appBar top nav component
*/
export const MobileNav = () => {
  const pageName = usePageName()
  // /** lookup map for at 'active' || 'inactive' navigation text styles */
  // const navTextStyle: {[key:string]: any} = {
  //   'active':   {
  //     color: 'white',
  //     fontWeight: 'normal',
  //     fontSize: '14px',
  //     lineHeight: '18px'
  //   },
  //   'inactive': {
  //     color: '#737373',
  //     fontWeight: 'normal',
  //     fontSize: '14px',
  //     lineHeight: '18px'
  //   }
  // }

  const colProps = {
    span: 6,
    style: {display: 'inline-flex', justifyContent: 'center'},
  }

  return (
    // since bottom nav bar sits on top, add padding to make viewport scroll to uncover
    <div style={{paddingBottom: Const.HEIGHT.BOTTOM_NAV_BAR}}>
      {getAppBar(pageName)}
      {persistentPages[pageName]}
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          zIndex: 1,
          height: Const.HEIGHT.BOTTOM_NAV_BAR,
          backgroundColor: '#383838',
        }}
      >
        <Row justify="center" style={{padding: '15px 0px 0px 0px'}}>
          {pageNames.map((x) => (
            <Col {...colProps} key={x}>
              <Button
                type="text"
                onClick={() => cs.putPageName(x)}
                icon={navIcons[getNavItemStyle(x, pageName)][x]}
              />
            </Col>
          ))}
        </Row>
        {/* <Row justify="center" style={{padding: '0px 0px 0px 0px'}}>
          {pageNames.map((x) => (
            <Col {...colProps} key={x}>
              <Typography.Text style={textStyle[getStyle(x,pageName)]}>{x}</Typography.Text>
            </Col>
          ))}
        </Row> */}
      </div>
    </div>
  )
}
