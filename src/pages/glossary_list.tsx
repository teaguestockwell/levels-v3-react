import {useUserAir} from '../hooks/user_store'
import {List} from 'antd'

export const GlossaryList = () => {
  const air = useUserAir()

  return (
    <List
      itemLayout="horizontal"
      dataSource={air?.glossarys ?? []}
      pagination={{pageSize: 1000}}
      style={{
        padding: 12,
      }}
      renderItem={(g) => (
        <List.Item>
          <List.Item.Meta title={g.name} description={g.body} />
        </List.Item>
      )}
    />
  )
}
