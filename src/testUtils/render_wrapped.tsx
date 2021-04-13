import {QueryClient, QueryClientProvider} from 'react-query'
import {render} from '@testing-library/react'
import {useUserAirs} from '../hooks/use_user_airs'
import {getCargoSchema} from '../util'
import {AirStore} from '../hooks/air_store'
import React from 'react'

const IsLoaded = ({children}: {children: React.ReactNode}) => {
  const {data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    const initAir = data.values().next().value
    AirStore.getState().setSelectedAir(initAir)
    AirStore.getState().setCargoSchema(getCargoSchema(initAir))

    return <>{children}</>
  }

  return <div>Loading Test</div>
}

const queryClientInit = new QueryClient()

interface WrapperProps {
  children?: React.ReactNode
}
const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <QueryClientProvider client={queryClientInit}>
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
