import React, { Component } from 'react';
import Styles from '../css/home.module.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {}
    render() {
        return (
            <div className={Styles.home}>
                <div className={Styles.gobang}>五子棋</div>
                <Link type='button' className={Styles.local_battle} style={{ color: "black" }} to="/home/local_battle">👤本地对战</Link>
                <Link type='button' className={Styles.create_room} style={{ color: "aliceblue" }} to="/home/create_room">👥创建房间</Link>
                <input className={Styles.input_form} placeholder="输入房间号" style={{ width: "224px", height: "38px" }} />
                <input type='submit' className={Styles.enter} value="⭕进入房间" style={{ color: "black" }} />
            </div>
        );
    }
}

export default Home;