import {useUserAir} from '../hooks/user_store'
import { AirSyncSelect } from '../nav/air_sync_select'
import * as Types from '../types'
import { Collapse } from 'antd'

export const GlossaryList = () => {
  const air = useUserAir() as Types.AircraftDeep

  const getItem = (g: Types.Glossary) => {
    return <Collapse.Panel key={g.glossaryId} header={g.name} style={{fontSize: 18, fontWeight: 600, overflowWrap: 'break-word', paddingTop: 0, paddingBottom: 0}}>
      <div style={{fontWeight: 400, padding: 20, textAlign:'left',fontSize: 16,overflowWrap: 'break-word'}}>{g.body}</div>
    </Collapse.Panel>
  }

  return <div style={{paddingBottom: 100}}>
  <AirSyncSelect type='user' />
  <Collapse style={{marginTop: 15}}>
    {air.glossarys.map(g => getItem(g))}
  </Collapse>
  </div>
}

// return <div key={g.glossaryId} style={{marginTop: 28}}>
// <div style={{fontWeight: 'bold',fontSize: 20, overflowWrap: 'break-word'}}>{g.name}</div>
// <div style={{textAlign:'left',fontSize: 14,overflowWrap: 'break-word'}}>{g.body}</div>
// </div>
