/* eslint-disable react/display-name */
import {Col, Empty, Result, Row, Skeleton, Table} from 'antd'
import {useMemo} from 'react'
import {capitalizeFirst} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {usePolling, adminActions} from '../hooks/use_admin_polling'
import {adminStore} from '../hooks/admin_store'
import {v4} from 'uuid'
import {AdminAddNew} from './admin_add_new'

export const JsonTable = () => {
  const ep = adminStore((s) => s.ep)
  const {data} = usePolling(ep)

  const table = useMemo(() => {
    if (!data) {
      return (
        <div style={{paddingLeft: '12px', paddingRight: '12px'}}>
          <Skeleton active paragraph={{rows: 20}} />
        </div>
      )
    }

    if (data.msg) {
      return (
        <Result
          status="error"
          title={`${data.msg}` ? `${data.msg}` : 'Failed to load'}
        />
      )
    }

    if (data.length === 0) {
      return <Empty />
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
        key: v4(),
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
      <>
        <AdminAddNew />
        <Table
          style={{padding: '0px 12px 0px 12px'}}
          pagination={{pageSize: 1000}}
          scroll={{y: 500}}
          columns={columns}
          dataSource={data}
          //rowKey="name"
          sticky
        />
      </>
    )
  }, [data, ep])

  return table
}
