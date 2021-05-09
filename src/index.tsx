import React from 'react'
import ReactDOM from 'react-dom'
import {QueryClientProvider} from 'react-query'
import {InitLoaded} from './nav/init_loaded'
import 'antd/dist/antd.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {queryClient} from './const'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InitLoaded />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
serviceWorkerRegistration.register()
