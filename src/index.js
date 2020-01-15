import { composeWithDevTools } from "redux-devtools-extension";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//Store
import { createStore } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';

const composeEnhancers = composeWithDevTools({});
const store = createStore(myReducer, composeEnhancers());

ReactDOM.render(
    <Provider store={ store }>
    {/* Provider sẽ cung cấp store cho thằng App, dùng để kêt nối redux với reactjs */}
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
