import React from 'react'
import ReactDOM from 'react-dom'
import {QueryClientProvider} from 'react-query'
import {InitLoadingWrapper} from './layout/initLoadingWrapper'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InitLoadingWrapper />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
