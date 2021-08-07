import {Clock} from '../components/clock'
import { MaxContent } from '../components/max_content'

export const AppBar = ({
  sync,
  select,
}: {
  sync: JSX.Element | null
  select: JSX.Element
}) => {
  // admin app bars contain AdminAirSelects that sync client and server state automatically
  // user app bars contain UserAirSelects that use init state of service worker cache.
  // the cache is updated by the ClientServerSync. if initState !== currentState the users may opt in to refresh
  return <div
      style={{
        zIndex: 2,
        position: 'fixed',
        height: 130,
        left: 0,
        right: 0,
        top: 0,
        background: '#06645E',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '0px 0px 20px 20px',
        textAlign: 'center',
      }}
    >
      <MaxContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 44,
          marginRight: 14, marginLeft: 14,
        }}
      >
          <div
            style={{
              textShadow: '0px 2px 4px rgba(255, 255, 255, 0.25)',
              fontFamily: 'Revalia',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 24,
              textAlign: 'left',
              color: 'white',
            }}
          >
            Levels
          </div>

        <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
          {select}
          {sync}
        </div>

    </div>
    <Clock />
    </MaxContent>
  </div>
}
