import {QueryClient, QueryClientProvider} from 'react-query'
import {render, screen} from '@testing-library/react'
import {InitLoaded} from './init_loaded'


describe('InitLoaded', () => {

  it('will render', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <InitLoaded />
      </QueryClientProvider>
    )

    expect(screen.queryAllByText('Loading Test').length).toBe(0)
    expect(screen.queryAllByTestId('mobile-nav').length).toBe(0)
  
  })
})
