import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import { store } from './store/store'

import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import { Provider } from 'react-redux'
Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

