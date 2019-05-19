import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainPage/> , document.getElementById('root'));
serviceWorker.unregister();
