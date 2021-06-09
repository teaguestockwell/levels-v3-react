import React from 'react'
import ReactDOM from 'react-dom'
import {QueryClientProvider} from 'react-query'
import {InitLoaded} from './nav/init_loaded'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {queryClient} from './utils/const'
import './index.css'
import './fonts/Revalia-Regular.ttf'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <InitLoaded />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
serviceWorkerRegistration.register()
