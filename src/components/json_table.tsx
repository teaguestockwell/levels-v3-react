/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, Col, message, Modal, Row, Table} from 'antd'
import {useMemo, useState} from 'react'
import {capitalizeFirst, getNewModelFromEP} from '../util'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {AdminForm} from './admin_form'
import {v4} from 'uuid'
import {UsePollingAtEP, delete1, put1} from '../hooks/use_admin_polling'

const JTable = ({
  onEdit,
  onDelete,
  ep,
}: {
  ep: string
  onEdit: (obj: Record<string, unknown>) => void
  onDelete: (obj: Record<string, unknown>) => void
}) => {
  const {data} = UsePollingAtEP(ep)
  console.log('fetching table')


  const table = useMemo(() => {
    console.log('redrawing table')
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

    return (
      <Table
        pagination={{pageSize: 50}}
        scroll={{y: 500}}
        dataSource={data}
        columns={columns}
      />
    )
  }, [data])

  return table
}

export const JsonTable = ({ep}: {ep: string}) => {
  const [objEditState, setObjEditState] = useState<Record<string, unknown>>()

  const afterAction = async (
    apiRes: Promise<number>,
    action: string,
    name: string
  ): Promise<boolean> => {
    const key = v4()
    let success = false

    message.loading({content: `${action}ing ${name}...`, key})
    try {
      const result = await apiRes
      message.success({content: `${name} ${action}ed`, key, duration: 5})
      success = true
    } catch (e) {
      message.error({content: `${e}`, key, duration: 3})
    }

    return success
  }

  const onDelete = (obj: Record<string, unknown>) => {
    afterAction(delete1(ep, obj), 'Delet', obj.name as string)
  }

  const onEditDone = (obj: any) => {
    // if api return 200, and it saves, close the modal. Otherwise leave it open
    afterAction(put1(ep, obj), 'Sav', obj.name as string).then((success) => {
      if (success) {
        setObjEditState(undefined)
      }
    })
  }

  const onEdit = (obj: Record<string, unknown>) => {
    setObjEditState(obj)
  }

  const onCancel = (obj: any) => {
    setObjEditState(undefined)
  }

  const onNewRow = () => {
    setObjEditState(getNewModelFromEP(ep))
  }

  const table = useMemo(() => {
    return <>
     <Button onClick={onNewRow}>Add New</Button>
    <JTable onDelete={onDelete} onEdit={onEdit} ep={ep} />
    </>
  }, [ep])

  return (
    <>
      {table}
      {objEditState ? (
        <Modal
          visible={true}
          footer={null}
          onCancel={onCancel}
          centered
          closable={false}
        >
          <AdminForm obj={objEditState} ep={ep} onSave={onEditDone} />
        </Modal>
      ) : null}
    </>
  )
}
