import React from 'react';
import {connect} from "react-redux";
import {increment} from "../../actions";
import {Link} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment());
    }

    onClick2() {
        this.props.dispatch({type: 'INCREMENT_ASYNC'});
    }

    render() {
        return (
            <div>
                <div>react-router 测试</div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/about/">关于</Link>
                            <Link to="/users/">用户</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <label>current number: {this.props.number}</label>
                    <button onClick={() => this.onClick()}>点击+1</button>
                </div>
                <div>
                    <label>current number: {this.props.number}</label>
                    <button onClick={() => this.onClick2()}>点击2秒后+1</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        number: state.number
    })
)(App);
