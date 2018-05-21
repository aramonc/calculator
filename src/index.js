import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Calculator />, document.getElementById('calculator'));
registerServiceWorker();
