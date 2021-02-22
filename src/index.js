
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { DataServiceProvider } from './components/data-service-context';
import App from './components/app/index';
import ErrorBoundry from './components/error-boundry/index';
import DataService from './services/data-service';
import store from './store';


const dataService = new DataService()

ReactDom.render(
    <Provider store={store}>
        <ErrorBoundry>
            <DataServiceProvider value={dataService}>
                <Router>
                    <App />
                </Router>
            </DataServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)

