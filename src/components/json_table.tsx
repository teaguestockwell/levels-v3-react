/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Col, Modal, Row, Table} from 'antd'
import {useMemo, useState} from 'react'
import {UseAdminQuery} from '../hooks/use_admin_query'
import {capitalizeFirst} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import { AdminForm } from './admin_form'
import { Console } from 'console'
import { delete1 } from '../services/admin_service'

const JTable = (
  {onEdit,onDelete,ep}:
  {
    ep: string
    onEdit: (obj:Record<string,unknown>)=> void,
    onDelete: (obj:Record<string,unknown>) => void
  }) => {
  const {data} = UseAdminQuery(ep, {aircraftId: 1})

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
        dataIndex: '',
        key: 'operation',
        width: 124,
        render: (_: any, row: any) => (
          <Row>
            <Col span={8}>
              <DeleteOutlined
                style={{fontSize: '24px'}}
                onClick={() => onDelete(row)}
              />
            </Col>
            <Col span={8} offset={8}>
              <EditOutlined
                style={{fontSize: '24px'}}
                onClick={() => onEdit(row)}
              />
            </Col>
          </Row>
        ),
      },
    ]

    return <Table
      pagination={{pageSize: 50}}
      scroll={{y: 500}}
      dataSource={data}
      columns={columns}
    />
  }, [data])

  return table
}

export const JsonTable = () => {
  const ep = 'cargo'
  const [objEditState, setObjEditState] = useState<Record<string, unknown>>()

  const onDelete = (obj: Record<string,unknown>) => {
    console.log('on delete')
    delete1(ep,obj)
  }

  const onEdit = (obj: Record<string,unknown>) => {
    setObjEditState(obj)
  }

  return <>
    <JTable onDelete={onDelete} onEdit={onEdit} ep={ep}/>
    {
      objEditState ?
      <Modal
        visible={true}
        footer={null}
        onCancel={() => setObjEditState(undefined)}
        centered
        closable={false}
      >
        <AdminForm obj={objEditState} ep={ep}/>
      </Modal>
      : null
    }
  </>
}
