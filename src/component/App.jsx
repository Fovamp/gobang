import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import CreateRoom from './Create Room';
import LocalBattles from './Local battles';
import NotFound from './NotFound';
import { Navigate } from 'react-router-dom';


class App extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home/local_battle" element={<LocalBattles />} />
                        <Route path="/home/create_room" element={<CreateRoom />} />
                        <Route path="/NotFound" element={<NotFound />} />
                        <Route path="*" element={<Navigate replace to="/NotFound" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;