import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SightingBox from './SightingBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SightingBox />, document.getElementById('root'));
registerServiceWorker();
