import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <Provider store={store}>
                    <App />
                </Provider>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>,
)
