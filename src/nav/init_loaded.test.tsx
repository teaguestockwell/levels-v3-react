import { QueryClient, QueryClientProvider } from 'react-query'
import {render, waitFor} from '@testing-library/react'
import {InitLoaded} from './init_loaded'

describe('InitLoaded', () => {
  it('will render', async () => {
    const queryClient = new QueryClient()
    const ct = render(
      <QueryClientProvider client={queryClient}>
        <InitLoaded/>
      </QueryClientProvider>
    )
      await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
  })
})