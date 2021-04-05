import React from 'react'
import ReactDOM from 'react-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {InitLoadingWrapper} from './navigation/initLoadingWrapper'
import 'antd/dist/antd.css'

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
