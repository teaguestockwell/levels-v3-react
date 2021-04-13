import React from 'react'
import ReactDOM from 'react-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {InitLoaded} from './nav/init_loaded'
import 'antd/dist/antd.css'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InitLoaded />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
