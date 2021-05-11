/* eslint-disable @typescript-eslint/no-unused-vars */
import {Const} from '../const'
import { Affix, Button, Col, Row, Typography } from 'antd'
import {
  ContainerFilled,
  LayoutFilled,
  ToolFilled,
  QuestionCircleFilled,
} from '@ant-design/icons'


export const MobileNav = (
  {
    page,
    pageName,
    setPage,
    userAirSelect,
    adminAirSelect 
  }:
  {
    page: JSX.Element,
    pageName: string,
    setPage: (pageName:string) => void,
    userAirSelect: JSX.Element,
    adminAirSelect: JSX.Element,
  }
) => {
  const pages = ['%MAC', 'Glossary', 'Help', 'Admin']

  const getIconStyle = (name: string) => ({
    color: name === pageName ? 'white' : '#737373',
    height: '30px',
    fontSize: '175%',
  })

  const getIcon = (name: string) => {
    if (name === '%MAC') {
      return <LayoutFilled style={getIconStyle(name)} />
    }
    if (name === 'Admin') {
      return <ToolFilled style={getIconStyle(name)} />
    }
    if (name === 'Glossary') {
      return <ContainerFilled style={getIconStyle(name)} />
    }
    if (name === 'Help') {
      return <QuestionCircleFilled style={getIconStyle(name)} />
    }
    return null
  }

  const getTextStyle = (name: string): any => ({
    color: name === pageName ? 'white' : '#737373',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '18px',
  })

  const colProps = {
    span: 6,
    style: {display: 'inline-flex', justifyContent: 'center'},
  }


  return (
    <div style={{paddingBottom: Const.HEIGHT.BOTTOM_NAV_BAR}}>
      <Affix>
      <div
        style={{
          height: Const.HEIGHT.APP_BAR,
          backgroundColor: '#383838',
        }}
      >
        <Row justify="center" style={{paddingTop: '8px'}}>
          <Col span={8}>
            <Typography.Text
              style={{
                color: 'white',
                fontWeight: 'normal',
                fontSize: '32px',
                lineHeight: '30px',
                paddingLeft: '12px',
              }}
            >
              Atlas
            </Typography.Text>
          </Col>
          <Col span={8}></Col>
          <Col span={8} style={{textAlign: 'end', paddingRight: '12px'}}>
            {pageName !== 'Admin' ? userAirSelect : adminAirSelect}
          </Col>
        </Row>
      </div>
    </Affix>

      {page}

      <div style={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        height: Const.HEIGHT.BOTTOM_NAV_BAR,
        backgroundColor: '#383838',
      }}>
        <Row justify="center" style={{padding: '15px 0px 0px 0px'}}>
          {pages.map((x) => (
            <Col {...colProps} key={x}>
              <Button
                type='text'
                onClick={() => setPage(x)}
                icon={getIcon(x)}
              />
            </Col>
          ))}
        </Row>
        <Row justify="center" style={{padding: '0px 0px 0px 0px'}}>
          {pages.map((x) => (
            <Col {...colProps} key={x}>
              <Typography.Text style={getTextStyle(x)}>{x}</Typography.Text>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
