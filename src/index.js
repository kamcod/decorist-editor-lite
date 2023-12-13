import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {IntlProvider} from 'react-intl';
import { Provider } from "react-redux";
import {store} from "./store";
import languages from "./intl/languages";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <IntlProvider messages={languages.en} locale="en" defaultLocale="arabic">
        <Provider store={store}>
            <App />
        </Provider>
    </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
