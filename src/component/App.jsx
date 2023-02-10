import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import CreateRoom from './Create Room';
import LocalBattles from './Local battles';
import NotFound from './NotFound';
import Match from './match';
import { Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: false,
        username: "",
    }
    componentDidMount() {
        $.ajax({
            url: "https://app2333.acapp.acwing.com.cn/gobang/get_status/",
            type: "get",
            success: resp => {
                if (resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    });
                } else {
                    this.setState({
                        is_login: false,
                    });
                }
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <Routes>
                    <Route path="/gobang" element={<Home is_login={this.state.is_login} username={this.state.username} />} />
                    <Route path='/gobang/login' element={this.state.is_login ? <Navigate replace to="/gobang/" /> : <Login />} />
                    <Route path='/gobang/register' element={this.state.is_login ? <Navigate replace to="/gobang/" /> : <Register />} />
                    <Route path="/gobang/local_battle" element={<LocalBattles />} />
                    <Route path="/gobang/create_room" element={<CreateRoom />} />
                    <Route path='/gobang/match' element={<Match />} />
                    <Route path="/gobang/NotFound" element={<NotFound />} />
                    <Route path="*" element={<Navigate replace to="/gobang/NotFound" />} />
                </Routes>
            </React.Fragment>
        );
    }
}

export default App;