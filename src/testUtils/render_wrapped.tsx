import {QueryClientProvider} from 'react-query'
import {queryClient} from '../utils/const'
import {render} from '@testing-library/react'
import {useUserAirs} from '../hooks/query'

import {userStore} from '../hooks/user_store'
import React from 'react'

const IsLoaded = ({children}: {children: React.ReactNode}) => {
  const {data} = useUserAirs()

  if (data?.data && data?.data.length > 0) {
    //init state of selected aircraft
    userStore.getState().setAir(data.data[0], false)
    //userStore.getState().clearCargoMap()

    // init state of server client sync
    localStorage.setItem('lastSync', `${data.serverEpoch}`) 

    return <>{children}</>
  }

  return <div>Loading Test</div>
}

interface WrapperProps {
  children?: React.ReactNode
}
const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <IsLoaded>{props.children}</IsLoaded>
    </QueryClientProvider>
  )
}

/** wrap with QueryClientProvider,
 *  init useUser with data from msw,
 *  init userStore with data from useUser
 */
export const renderWrapped = (component: JSX.Element, {...options} = {}) => {
  return render(component, {
    // eslint-disable-next-line react/display-name
    wrapper: (props) => <Wrapper {...props} />,
    ...options,
  })
}

export * from '@testing-library/react'
