import { QueryClient, QueryClientProvider } from 'react-query'
import {render, waitFor} from '@testing-library/react'
import {InitLoaded} from './init_loaded'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('InitLoaded', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const queryClient = new QueryClient()
    const ct = render(
      <QueryClientProvider client={queryClient}>
        <InitLoaded/>
      </QueryClientProvider>
    ) 
      await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
      await waitFor(() => expect(ct.getByText('Tank 1: 250')).toBeInTheDocument())
  })
})