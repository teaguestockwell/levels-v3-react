/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert } from "antd"
import { useEffect, useMemo, useState } from "react"
import { v4 } from "uuid"
import { adminStore } from "../hooks/admin_store"
import { usePolling } from "../hooks/use_admin_polling"

// this component dose not sync anything, it is used only for display
export const AdminServerSync = () => {
  const ep = adminStore((s) => s.ep)
  const {data, dataUpdatedAt} = usePolling(ep)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const time = setTimeout(() => setNow(Date.now()), 500)
    return () => clearTimeout(time)
  }, [now])

  const getDif = () => {
    return ((Date.now() - dataUpdatedAt) / 1000).toFixed(1)
  }

  return useMemo(() => {

   return <Alert
      banner
      showIcon
      key={v4()}
      type={data ? 'success' : 'error'}
      message={data ? `synced ${getDif()}s ago` : 'Offline'}
      style={{
        marginTop: '-1px',
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
        height: '32px',
        width: window.innerWidth < 750 ? '100%' : '300px'
      }}
    />
  }
  ,[now])
}