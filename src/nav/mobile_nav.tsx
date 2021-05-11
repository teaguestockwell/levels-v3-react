/* eslint-disable @typescript-eslint/no-unused-vars */
import {Const} from '../const'
import { Button, Col, Row, Typography } from 'antd'
import { AppBar } from './app_bar'
import { getIcon, getTextStyle, pages } from './dynamic_main_nav'

export const MobileNav = (
  {
    page,
    pageName,
    setPage,
    select
  }:
  {
    page: JSX.Element,
    pageName: string,
    setPage: (pageName:string) => void,
    select: JSX.Element,
  }
) => {

  const colProps = {
    span: 6,
    style: {display: 'inline-flex', justifyContent: 'center'},
  }

  return (
    <div style={{paddingBottom: Const.HEIGHT.BOTTOM_NAV_BAR}}>
      <AppBar select={select}/>
        {page}

      <div style={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        zIndex: 1,
        height: Const.HEIGHT.BOTTOM_NAV_BAR,
        backgroundColor: '#383838',
      }}>
        <Row justify="center" style={{padding: '15px 0px 0px 0px'}}>
          {pages.map((x) => (
            <Col {...colProps} key={x}>
              <Button
                type='text'
                onClick={() => setPage(x)}
                icon={getIcon(x, pageName)}
              />
            </Col>
          ))}
        </Row>
        <Row justify="center" style={{padding: '0px 0px 0px 0px'}}>
          {pages.map((x) => (
            <Col {...colProps} key={x}>
              <Typography.Text style={getTextStyle(x, pageName)}>{x}</Typography.Text>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
