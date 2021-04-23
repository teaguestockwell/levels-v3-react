/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Col, Row, Table} from 'antd'
import {useMemo} from 'react'
import {UseAdminQuery} from '../hooks/use_admin_query'
import {capitalizeFirst} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

export const JsonTable = () => {
  const {data} = UseAdminQuery('cargo', {aircraftId: 1})

  const table = useMemo(() => {
    console.log('updating table...')
    if (!data) {
      return <div>loading state</div>
    }

    if (data.msg) {
      return <div>error state</div>
    }

    if (data.length === 0) {
      return <div>empty state</div>
    }

    // table state
    const filteredKeys = [
      'name',
      ...Object.keys((data as Record<string, unknown>[])[0])
        .filter((k) => !k.includes('Id') && k !== 'name')
        .sort((a, b) => a.localeCompare(b)),
    ]

    const columns = [
      ...filteredKeys.map((k) => ({
        title: capitalizeFirst(k),
        dataIndex: k,
        key: k,
      })),

      {
        title: 'Delete / Edit',
        key: 'operation',
        width: 124,
        render: (_: any, row: any) => (
          <Row>
            <Col span={6}>
              <DeleteOutlined
                style={{fontSize: '32px'}}
                onClick={() => alert(JSON.stringify(row))}
              />
            </Col>
            <Col span={6} offset={6}>
              <EditOutlined
                style={{fontSize: '32px'}}
                onClick={() => alert(JSON.stringify(row))}
              />
            </Col>
          </Row>
        ),
      },
    ]

    const filteredData = (data as Record<string, unknown>[]).map((row) =>
      Object.fromEntries(filteredKeys.map((k) => [k, row[k]]))
    )

    return (
      <Table
        pagination={{pageSize: 50}}
        scroll={{y: 500}}
        dataSource={filteredData}
        columns={columns}
      />
    )
  }, [data])

  return table
}
