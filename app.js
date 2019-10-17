import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './src/views/App';
import store from "./src/store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const About = () => (<h2>
    关于
    <hr />
    关于
</h2>);
const Users = ()=> (<h2>
    用户
    <hr />
    用户
</h2>);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" extract component={App} />
                <Route path="/about/" component={About} />
                <Route path="/users/" component={Users} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
