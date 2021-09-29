/* eslint-disable react/display-name */
import {Empty, Popconfirm, Result, Skeleton, Table} from 'antd'
import {capitalizeFirst,formatDate} from '../utils/util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {usePolling} from '../hooks/query'
import {adminActions} from '../utils/admin_actions'
import {adminStore} from '../hooks/admin_store'
import {v4} from 'uuid'
import {AdminAddNew} from './admin_add_new'
import React from 'react'
import {isEqual} from 'lodash'

const RenderTable = React.memo(
  ({data}: {data:any}) => {

    if (!data || isEqual(data, {})) {
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
          <div style={{display: 'flex',justifyContent: 'space-around'}}>
            <Popconfirm
              placement="left"
              title={'Are you sure?'}
              onConfirm={() => adminActions().deleteRow(row)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                data-testid={row.name + ' admin delete'}
                style={{fontSize: '24px'}}
              />
            </Popconfirm>
            <EditOutlined
              data-testid={row.name + ' admin edit'}
              style={{fontSize: '24px'}}
              onClick={() => adminActions().openEditModal(row)}
            />
          </div>
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
            data.map((obj: any) => ({
              ...obj,
              updated: formatDate(new Date(obj.updated)),
            }))
          }
        />
      </>
    )
  },
  (s0:any,s1:any) => isEqual(s0,s1)
)

export const JsonTable = () => {
  const ep = adminStore((s) => s.ep)
  const {data} = usePolling(ep)

  return <RenderTable data={data}/>
}
