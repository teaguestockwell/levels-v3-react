/* eslint-disable @typescript-eslint/no-unused-vars */
import { MaxContent } from '../components/max_content'
import {Aircraft} from '../components/icons'

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
  return <>
    {sync}
    <MaxContent
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        background: '#fff',
      }}
      >
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
        >
      <Aircraft h={24} w={24} color={'#C4C4C4'} style={{marginLeft: 10}}/>
      {select}

    </div>

    </MaxContent>
    </>
}
