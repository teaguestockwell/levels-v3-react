import {adminStore} from '../hooks/admin_store'
import {adminActions} from '../utils/admin_actions'
import {capitalizeFirst, getModelFromEP} from '../utils/util'

export const AdminAddNew = () => {
  const ep = adminStore((s) => s.ep)
  const model = capitalizeFirst(getModelFromEP(ep))

  return (
    <div
      style={{display: 'flex',padding: 15}}
    >

      <div
        className="hover-button"
        style={{
          background: '#06BA7F',
          color: '#fff',
          borderRadius: 45,
          paddingLeft: 20,
          paddingRight: 20,
          height: 30,
          overflowWrap: 'break-word',
          cursor: 'pointer',
          textAlign: 'center',
          lineHeight: '30px',
          width: 'fit-content',
          fontSize: 14
        }}
        onClick={() => adminActions().addNewRow()}
        data-testid="admin add new"
      >
        {`Add ${model}`}
      </div>
    </div>
  )
}
