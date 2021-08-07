import {useUserAir} from '../hooks/user_store'
import { AircraftDeep } from '../types/aircraftDeep'

export const GlossaryList = () => {
  const air = useUserAir() as AircraftDeep

  return <div style={{paddingLeft: 14,paddingRight: 14, textAlign: 'left'}}>
    {
      air.glossarys.map(g => {
        return <div key={g.glossaryId} style={{paddingTop: 28}}>
          <div style={{display: 'flex', fontWeight: 'bold',fontSize: '2rem'}}>{g.name}</div>
          <div style={{display: 'flex', textAlign:'left',fontSize: '1rem'}}>{g.body}</div>
          </div>
      })
    }
  </div>
}
