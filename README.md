# react-all-stack
react 全家桶 (react, react-router, redux, redux-saga)

## 创建react-all-stack

```
mkdir react-all-stack
cd react-all-stack
yarn init -y
```

## 安装webpack

```
yarn add webpack
```

新增webpack.config.js文件
```
const path=require('path');

module.exports = {
  entry: './app.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'react-all-stack-webpack.bundle.js' // 输出文件名称
  }
};
```

更新package.json文件
```
...
  "scripts": {
    "build": "./node_modules/.bin/webpack --config webpack.config.js
  }
...
```

如果需要，安装webpack-cli
```
yarn add webpack-cli
```

执行webpack, 生成dist文件夹
```
yarn build
```

##接入react
安装react相关包文件
```
yarn add react react-dom
```
新增/src/views/App/index.js文件
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/views/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

在项目根目录下新增模板文件index.html
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>index</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

##Babel解析js文件
安装babel-loader, @babel/core, @babel/preset-env, @Babel/preset-react
```
yarn add babel-loader@8 @babel/core @babel/preset-env @babel/preset
-react -D
```
更新webpack.config.js
```
const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-all-stack-webpack.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/, // 匹配.js文件
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
}
```
在项目根目录下新增.babelrc文件
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```
配置HtmlWebpackPlugin
```
yarn add html-webpack-plugin -D
```
修改webpack.config.js文件
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-all-stack-webpack.bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: path.resolve(__dirname, "dist/index.html")
        })
    ]
}
```
##配置webpack-dev-server
安装webpack-dev-server
```
yarn add webpack-dev-server -D
```
更新package.json的启动脚本
```
  "start": "webpack-dev-server --config webpack.config.js --open"
```
更新webpack.config.js文件
```
devServer: {
        hot: true, // 热替换
        contentBase: path.join(__dirname, 'dist'), // server文件的根目录
        compress: true, // 开启gzip
        port: 8080 // 端口
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: path.resolve(__dirname, "dist/index.html")
        })
    ]
}
```
##引入redux
安装依赖
```
yarn add redux react-redux -D
```
添加/src/actions/index.js
```
export const increment = () => {
    return {
        type: 'INCREMENT',
    }
}
```
添加/src/reducers/index.js
```
const initialState = {
    number: 0
};

const incrementReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            state.number += 1
            return {...state}
        default:
            return state;
    }
};

export default incrementReducer;
```
添加/src/store/index.js
```
import {createStore} from "redux";
import incrementReducer from "../reducers";

const store = createStore(incrementReducer);

export default store;

```
更新入口文件app.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './src/views/App';
import store from "./src/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```
更新App组件
```
import React from 'react';
import {connect} from "react-redux";
import {increment} from "../../actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment());
    }

    render() {
        return (
            <div>
                <label>current number: {this.props.number}</label>
                <button onClick={()=>this.onClick()}>点击加一</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        number: state.number
    })
)(App);
```
##引入redux-saga
安装依赖包
```
yarn add redux-saga -D
```
新建src/sagas/index.js文件
```
import {delay, put, takeEvery} from 'redux-saga/effects';


export function* incrementAsync() {
    yield delay(2000);
    yield put({type: 'INCREMENT'});
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```
更新src/store/index.js文件
```
import { createStore, applyMiddleware } from 'redux';
import incrementReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync)
export default store;
```
更新App组件
```
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT_ASYNC' })
    }

    render() {
        return (
            <div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
            </div>
        );
    }
}
export default connect(
    state => ({
        number: state.number
    })
)(App);
```
配置generator支持
```
yarn add @babel/plugin-transform-runtime -D
```
更新.babelrc文件，支持generator
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
##引入react-router
```
yarn add react-router-dom
```
