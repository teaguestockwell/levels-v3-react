import {Row, Col, Button} from 'antd'

export const Help = () => {
  return <>
  <Row justify="center" style={{
  padding: '10px 4px 0px 4px',
  textAlign: 'center',
}}>
  <Col span={24} style={{paddingTop: 10, textAlign: 'center'}}>
    <a href={'https://forms.gle/Bbqvubn6gwC6fRnc8'} target="_blank" rel='noreferrer'>
    <Button 
      size='large'
      style={{
        borderColor: 'transparent',
        width: '100%',
        backgroundColor: '#06645E',
        color: 'white',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }} 
      data-testid='contact button'>Contact Us</Button>
    </a>
  </Col>
</Row>
  </>
}
