import React, { Component } from 'react';
import AozakiAoko from '../../img/AozakiAoko.png';
// import AozakiAoko from '/home/tuhon/acapp/game/static/js/AozakiAoko.png';

const style = {
    width: "23rem",
    margin: "auto",
    top: "6%",
    boxShadow: "0px 3px 7px -1px rgb(95, 92, 92)"
}
class Card extends Component {
    state = {}

    render() {
        return (
            <React.Fragment>
                <div className="card" style={style} >
                    <img src={AozakiAoko} className="card-img-top" alt="AozakiAoko" />
                    <div className="card-body">
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Card;