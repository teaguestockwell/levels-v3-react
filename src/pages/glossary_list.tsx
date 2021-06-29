
import {useUserAir} from '../hooks/user_store'
import {Col, List, Row} from 'antd'

// const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
// <a href={g.body.match(reg)?.[0]}>{g.name}</a>

export const GlossaryList = () => {
  const air = useUserAir()

  const breakPoints = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 20,
    xl: 16,
    xxl: 12,
  }

  return (
    <Row justify="center" style={{padding: '12px 12px 12px 12px'}}>
      <Col {...breakPoints}>
        <List
          itemLayout="horizontal"
          dataSource={air?.glossarys ?? []}
          pagination={{pageSize: 1000}}
          renderItem={(g) => (
            <List.Item style={{maxWidth: '800px'}}>
              <List.Item.Meta title={g.name} description={g.body} />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}
