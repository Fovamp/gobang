import React, { Component } from 'react';
import Card from './base/card';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Styles from '../css/login.module.css';

class Login extends Component {
    state = {
        error_message: "",
        username: "",
        password: "",
    }
    handleClick = (e) => {
        e.preventDefault();

        if (this.state.username === "")
            this.setState({ error_message: "用户名不能为空" });
        else if (this.state.password === "")
            this.setState({ error_message: "密码不能为空" });
        else {
            $.ajax({
                url: "https://app2333.acapp.acwing.com.cn/gobang/login/",
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: "json",
                success: resp => {
                    if (resp.result === "success") {
                        window.location.href = "/gobang";
                    } else {
                        this.setState({ error_message: resp.result });
                    }
                }
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <Link className={Styles.home} to="/gobang">主页</Link>
                <Card>
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col col-sm-10">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">用户名</label>
                                        <input onChange={(e) => { this.setState({ username: e.target.value }) }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">密码</label>
                                        <input onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div style={{ hright: "1rem", color: "red", fontSize: "3px" }}>
                                        {this.state.error_message}
                                    </div>
                                    <button onClick={this.handleClick} style={{ width: "100%" }} type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

export default Login;