import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';

import MatchContainer from './component/MatchContainer';
import store from './store/configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}><MatchContainer/></Provider>,
  document.getElementById('root')
);

