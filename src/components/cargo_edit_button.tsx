import {getUserActions, useCargo} from '../hooks/user_store'
import {Row, Col} from 'antd'

const cs = getUserActions()

export const CargoEditRow = ({uuid,style}: {uuid: string, style?:any}) => {
  const cargo = useCargo(uuid)

  const getText = (text:string) => <div
    style={{
      fontSize: 12,
      display: 'flex',
      textAlign: 'left',
      color: '#C4C4C4'
    }}>{text}</div>

  return <div
    onClick={() => cs.setEditUuid(uuid)}
    style={{
      cursor: 'pointer',
      paddingTop: 10,
      ...style
    }}
  >
    <Row justify="start">
        <Col span={40}>
          <div
            style={{
              fontSize: 12,
              display: 'flex',
              textAlign: 'left',
              color: cargo.isValid ? '#383838' : '#FF4D4F'
            }}
          >{cargo.name ? cargo.name : '???'}</div>
        </Col>
    </Row>

    <Row justify="center" style={{paddingTop: 10}}>
      <Col span={8} style={{display: 'inline-flex', justifyContent: 'center'}}>
        <div
          style={{justifyContent: 'space-between'}}
        >
          {getText('Weight Ea')}
          {getText(cargo.weightEA ? cargo.weightEA : '???')}
        </div>
      </Col>
      <Col span={8} style={{display: 'inline-flex', justifyContent: 'center'}}>
        <div
          style={{justifyContent: 'space-between'}}
        >
          {getText('FS')}
          {getText(cargo.fs ? cargo.fs : '???')}
        </div>
      </Col>
      <Col span={8} style={{display: 'inline-flex', justifyContent: 'center'}}>
        <div
          style={{justifyContent: 'space-between'}}
        >
          {getText('Qty')}
          {getText(cargo.qty ? cargo.qty : '???')}
        </div>
      </Col>
    </Row>
  </div>
}
