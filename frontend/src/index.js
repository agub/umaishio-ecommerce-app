import React from 'react'
import './fonts/AxisStd/AxisStd-ExtraLight.otf'
import './fonts/AxisStd/AxisStd-UltraLight.otf'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import './index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
// import(/* webpackPreload: true */ './fonts/AxisStd/AxisStd-ExtraLight.woff2')
// import(/* webpackPreload: true */ './fonts/AxisStd/AxisStd-UltraLight.woff2')

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
