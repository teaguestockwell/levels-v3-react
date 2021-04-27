/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Col, message, Modal, Row, Table} from 'antd'
import {useMemo, useState} from 'react'
import {capitalizeFirst} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import { AdminForm } from './admin_form'
import { delete1, put1 } from '../services/admin_service'
import { get1 } from '../hooks/use_admin_service'
import { useQueryClient } from 'react-query'
import { v4 } from 'uuid'

const JTable = (
  {onEdit,onDelete,ep}:
  {
    ep: string,
    onEdit: (obj:Record<string,unknown>)=> void,
    onDelete: (obj:Record<string,unknown>) => void
  }) => {

  const {data} = get1(ep)

  
  if (!data) {
    return <div>loading state</div>
  }

  if (data.msg) {
      return <div>error state</div>
    }
    
    if (data.length === 0) {
      return <div>empty state</div>
    }
    
    const filteredKeys = [
      'name',
      ...Object.keys((data as Record<string, unknown>[])[0])
      .filter(k => typeof (data as Record<string, unknown>[])[0][k] !== 'object')
      .filter(k => !k.includes('Id'))
      .filter(k => k !== 'name')
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

    console.log('json table building at:  ' + ep)
    console.table(data)

    return <Table
      //key={v4()}
      pagination={{pageSize: 50}}
      scroll={{y: 500}}
      dataSource={data}
      columns={columns}
    />
}

export const JsonTable = ({ep} : {ep:string}) => {
  const [objEditState, setObjEditState] = useState<Record<string, unknown>>()
  const queryClient = useQueryClient()

  const afterAction = async (apiRes: Promise<number>, action:string, name:string) => {
    const key = v4()

    message.loading({ content: `${action}ing ${name}...`, key});
    try{
      const result = await apiRes
      message.success({ content: `${name} ${action}ed`, key, duration: 5})
    } catch(e){
      message.error({ content: `${e}`, key, duration: 3})
    }

    queryClient.invalidateQueries('get1')
    console.log('after action finished with: ' + status)
  }

  const onDelete = (obj: Record<string,unknown>) => {
    afterAction(delete1(ep,obj),'Delet', obj.name as string)
  }

  const onEditDone = (obj:any) => {
    afterAction(put1(ep,obj), 'Sav', obj.name as string)
  }

  const onEdit = (obj: Record<string,unknown>) => {
    setObjEditState(obj)
  }

  const onCancel = (obj:any) => {
    setObjEditState(undefined)
  }


  return <>
    <JTable onDelete={onDelete} onEdit={onEdit} ep={ep}/>
    {
      objEditState ?
      <Modal
        visible={true}
        footer={null}
        onCancel={onCancel}
        centered
        closable={false}
      >
        <AdminForm obj={objEditState} ep={ep} onSave={onEditDone}/>
      </Modal>
      : null
    }
  </>
}

