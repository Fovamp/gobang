import React, { Component } from 'react';
import Styles from '../css/home.module.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Home extends Component {
    state = {
    }
    constructor() {
        super();
        this.start();
    }
    start() {
    }
    render_gobang = () => {
        if (this.props.is_login) {
            return (
                <div className={Styles.home}>
                    <div className={Styles.gobang}>五子棋</div>
                    <Link type='button' className={Styles.local_battle} style={{ color: "black" }} to="/gobang/local_battle">👤本地对战</Link>
                    <Link type='button' className={Styles.create_room} style={{ color: "aliceblue" }} to="/gobang/create_room">👥创建房间</Link>
                    <input className={Styles.input_form} placeholder="输入房间号" style={{ width: "224px", height: "38px" }} />
                    <input type='submit' className={Styles.enter} value="⭕进入房间" style={{ color: "black" }} />
                    <Link type='button' className={Styles.Match} style={{ color: "#2F4F4F" }} to="/gobang/match">Ⓜ开始匹配</Link>
                </div>
            );
        }
        else {
            return "";
        }
    }
    handle_click() {
        $.ajax({
            url: "https://app2333.acapp.acwing.com.cn/gobang/logout/",
            type: "get",
            success: resp => {
                console.log(resp);
                if (resp.result === "success") {
                    window.location.href = "/gobang/";
                }
            }
        });
    }
    render_user = () => {
        if (this.props.is_login) {
            return (
                <React.Fragment>
                    <a type='span' className={Styles.login} style={{ cursor: "pointer" }}>{this.props.username}</a>
                    <a type='span' onClick={this.handle_click} className={Styles.register} style={{ cursor: "pointer" }}>退出</a>
                    {this.render_gobang()}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Link type='span' className={Styles.login} to="/gobang/login">登录</Link>
                    <Link type='span' className={Styles.register} to="/gobang/register">注册</Link>
                    {this.render_gobang()}
                </React.Fragment>
            );
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.render_user()}
            </React.Fragment>
        );
    }
}

export default Home;