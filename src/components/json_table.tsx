/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Col, Row, Table} from 'antd'
import {useMemo} from 'react'
import {capitalizeFirst} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {UsePollingAtEP, adminActions} from '../hooks/use_admin_polling'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'

const as = getAdminStoreActions()

export const JsonTable = () => {
  const ep = adminStore((s) => s.ep)
  const {data} = UsePollingAtEP(ep)

  const table = useMemo(() => {
    if (!data) {
      return <div>loading state</div>
    }

    if (data.msg) {
      return <div>error state</div>
    }

    if (data.length === 0) {
      return <div>empty state</div>
    }

    const displayKeys = [
      'name',
      ...Object.keys((data as Record<string, unknown>[])[0])
        .filter(
          (k) => typeof (data as Record<string, unknown>[])[0][k] !== 'object'
        )
        .filter((k) => !k.includes('Id'))
        .filter((k) => k !== 'name')
        .sort((a, b) => a.localeCompare(b)),
    ]

    const columns = [
      ...displayKeys.map((k) => ({
        title: capitalizeFirst(k),
        dataIndex: k,
        key: k,
      })),
      {
        title: 'Delete / Edit',
        dataIndex: '',
        key: 'operation',
        width: 124,
        render: (_: any, row: any) => (
          <Row>
            <Col span={8}>
              <DeleteOutlined
                style={{fontSize: '24px'}}
                onClick={() => adminActions().deleteRow(row)}
              />
            </Col>
            <Col span={8} offset={8}>
              <EditOutlined
                style={{fontSize: '24px'}}
                onClick={() => adminActions().openEditModal(row)}
              />
            </Col>
          </Row>
        ),
      },
    ]

    return (
      <Table
        pagination={{pageSize: 50}}
        scroll={{y: 500}}
        dataSource={data}
        columns={columns}
      />
    )
  }, [data, ep])

  return table
}
