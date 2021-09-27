
import {render, screen, waitFor} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {InitLoaded} from './init_loaded'

const queryClient = new QueryClient()

  it('will render the app', async () => {
    const store = {
      lastSync: '123'
    } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])

  render(
    <QueryClientProvider client={queryClient}>
      <InitLoaded  />
    </QueryClientProvider>
  )

    await waitFor(() => expect(screen.queryAllByText('Local').length).toBe(0))
})


