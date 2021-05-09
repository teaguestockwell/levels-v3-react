import {QueryClientProvider} from 'react-query'
import {queryClient} from '../const'
import {render} from '@testing-library/react'
import {useUserAirs} from '../hooks/use_user_airs'
import {getCargoSchema} from '../util'
import {AirStore} from '../hooks/air_store'
import React from 'react'

const IsLoaded = ({children}: {children: React.ReactNode}) => {
  const {data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    AirStore.getState().setSelectedAir(data.airs[0])
    AirStore.getState().setLastUpdated(data.lastUpdated)
    AirStore.getState().setCargoSchema(getCargoSchema(data.airs[0]))

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
 *  init AirStore with data from useUser
 */
export const renderWrapped = (component: JSX.Element, {...options} = {}) => {
  return render(component, {
    // eslint-disable-next-line react/display-name
    wrapper: (props) => <Wrapper {...props} />,
    ...options,
  })
}

export * from '@testing-library/react'
