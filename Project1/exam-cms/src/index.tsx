import * as React from 'react';
import * as ReactDOM from 'react-dom';

// 引入配置路由
import RouterView from './router/RouterView';
import router from './router/router';
import {BrowserRouter} from 'react-router-dom';

// 引入全局样式
import './index.css';
// 引入antd样式
import 'antd/dist/antd.css';

// 引入mobx实例
import {Provider} from 'mobx-react';
import store from './store'

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <RouterView routes={router.routes}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
