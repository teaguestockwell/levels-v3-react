import {useUserAir} from '../hooks/user_store'
import { AircraftDeep } from '../types/aircraftDeep'

export const GlossaryList = () => {
  const air = useUserAir() as AircraftDeep

  return <div style={{marginLeft: 14,marginRight: 14, textAlign: 'left'}}>
    {
      air.glossarys.map(g => {
        return <div key={g.glossaryId} style={{marginTop: 28}}>
          <div style={{fontWeight: 'bold',fontSize: 20, overflowWrap: 'break-word'}}>{g.name}</div>
          <div style={{textAlign:'left',fontSize: 14,overflowWrap: 'break-word'}}>{g.body}</div>
          </div>
      })
    }
  </div>
}
