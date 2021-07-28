/* eslint-disable react/display-name */
import {Col, Empty, Popconfirm, Result, Row, Skeleton, Table} from 'antd'
import {useMemo} from 'react'
import {capitalizeFirst} from '../utils/util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {usePolling} from '../hooks/query'
import {adminActions} from '../utils/admin_actions'
import {adminStore} from '../hooks/admin_store'
import {v4} from 'uuid'
import {AdminAddNew} from './admin_add_new'
import { formatDate } from '../utils/util'

export const JsonTable = () => {
  const ep = adminStore((s) => s.ep)
  const {data} = usePolling(ep)

  return useMemo(() => {
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
      return (
        <>
          <AdminAddNew />
          <Empty />
        </>
      )
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
            <Popconfirm placement="left" title={'Are you sure?'} onConfirm={() => adminActions().deleteRow(row)} okText="Yes" cancelText="No">
              <DeleteOutlined
                data-testid={row.name + ' admin delete'}
                style={{fontSize: '24px'}}
              />
            </Popconfirm>
            </Col>
            <Col span={8} offset={8}>
              <EditOutlined
                data-testid={row.name + ' admin edit'}
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
          scroll={{x: 500}}
          columns={columns}
          dataSource={
            // format the date of all rows
            data.map((obj:any) => ({
              ...obj,
              updated: formatDate(new Date(obj.updated))
            }))
        }
        />
      </>
    )
    // we dont need to dif data.key because the sw does not cache admin ep
  }, [data, ep])
}
