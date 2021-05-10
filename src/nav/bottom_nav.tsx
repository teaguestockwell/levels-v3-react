/* eslint-disable @typescript-eslint/no-unused-vars */
import { Affix, Button, Col, Row } from "antd"
import { ContainerFilled, LayoutFilled, ToolFilled, QuestionCircleFilled} from '@ant-design/icons';
import {Typography} from 'antd'
import { Const } from "../const";

const {Text} = Typography

export const BottomNav = ({page,onClick}:{page: '%MAC' | 'Glossary' | 'Admin' | 'Help', onClick: (page:string) => void}) => {
  const buttons = ['%MAC','Admin','Glossary','Help']

  const getIconStyle = (name:string) => ({
    color: name === page ? 'white' : '#737373',
    height: '30px',
    fontSize: '175%'
  })

  const getIcon = (name:string) => {
    if(name === '%MAC'){return <LayoutFilled style={getIconStyle(name)}/>}
    if(name === 'Admin'){return <ToolFilled style={getIconStyle(name)}/>}
    if(name === 'Glossary'){return <ContainerFilled style={getIconStyle(name)}/>}
    if(name === 'Help'){return <QuestionCircleFilled style={getIconStyle(name)}/>}
    return null
  }

  const getTextStyle = (name:string):any => ({
    color: name === page ? 'white' : '#737373',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '18px',
  })

  const butProps: any = {
    type: 'text',
  }

  const colProps = {
    span: 6,
    style: {display: 'inline-flex', justifyContent: 'center'}
  } 

  const footerStyle: any = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: Const.HEIGHT.BOTTOM_NAV_BAR,
    backgroundColor: '#383838',
  }

  return <div style={footerStyle}>
    <Row justify='center' style={{padding: '15px 0px 0px 0px'}} >
      {buttons.map(x => 
        <Col {...colProps} key={x}>
          <Button {...butProps} onClick={() => onClick(x)} icon={getIcon(x)}/>
        </Col>
      )}
    </Row>
    <Row justify='center' style={{padding: '0px 0px 0px 0px'}}>
      {buttons.map(x => 
        <Col {...colProps} key={x}><Text style={getTextStyle(x)}>{x}</Text></Col>
        )}
    </Row>
  </div>
}