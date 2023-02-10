import React, { Component } from 'react';
import $ from 'jquery';
import { getCircle, getGameMap, get2DArray, getRealCoordinate, getIndex, chess, chessHightlightandColor } from './util';
import { HowlAudio, checkIsWin, RunBeforeUnload, VictoryRoute, LastCountdown } from './util';



class Game extends Component {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.First = true;
        this.isBlack = true;
        this.LastChess = [];
        this.interval_id = null;
        this.Lastgradient = null;
        this.resize_time = 15;
        this.current_time = null;
        this.start();
    }
    state = {
        GameOver: false,
        isBlack: true,
    }
    start() {
        this.size();
        $(window).on('resize', () => {
            this.size();
        })
        get2DArray(this, 0);
    }
    componentDidMount() {
        this.canvas = $('.MyCanvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.draw();
    }
    draw() {
        let scale = Math.min(this.width, this.height) / 16;
        let Widthstart = this.width / 2 - (scale * 14 / 2);

        getGameMap(this.ctx, Widthstart, scale, this.width, this.height);
        chess(this, this.ctx, Widthstart, scale);
    }
    size() {
        let canvas = $('.MyCanvas');
        let root = $('#root');
        this.width = root.width();
        this.height = root.height();
        canvas.attr("width", this.width);
        canvas.attr("height", this.height);
        if (!this.First)
            this.draw();
        this.First = false;
        clearInterval(this.interval_id);
        this.LastChess = [];
        this.interval_id = null;
    }
    select(e) {
        let scale = Math.min(this.width, this.height) / 16;
        let Widthstart = this.width / 2 - (scale * 14 / 2);
        if (this.state.GameOver === true) {
            window.confirm(`游戏结束`);
        }
        let select = 0;
        const [realX, realY] = getRealCoordinate(e.clientX, e.clientY, Widthstart, scale);
        const [realXIndex, realYIndex] = getIndex(e.clientX, e.clientY, Widthstart, scale);

        if (realX >= Widthstart && realX <= Widthstart + 14 * scale && realY >= scale && realY <= 15 * scale && !this.res[realXIndex][realYIndex]) {
            if (this.state.isBlack === this.isBlack) {
                select = 1;
            } else {
                select = 2;
            }
            const gradient = chessHightlightandColor(realX, realY, scale, this.ctx, select)
            if (this.LastChess.length !== 0) {
                clearInterval(this.interval_id);
                getCircle(this.ctx, this.LastChess[0], this.LastChess[1], (scale - 3) / 2, this.Lastgradient);
            }
            getCircle(this.ctx, realX, realY, (scale - 3) / 2, gradient);
            HowlAudio();

            this.isBlack = !this.isBlack;
            this.res[realXIndex][realYIndex] = select; // 0 为空 1 为黑 2为白
            this.LastChess = [realX, realY];
            [this.interval_id, this.Lastgradient, this.current_time] = LastCountdown(this.ctx, realX, realY, select, scale, gradient, this.resize_time);
            const [dec, dir, pos, neg] = checkIsWin(this, realXIndex, realYIndex);
            if (dec) {
                setTimeout(() => {
                    clearInterval(this.interval_id);
                    VictoryRoute(this.ctx, realXIndex, realYIndex, dir, pos - 1, neg - 1, Widthstart, scale, select);
                    alert(select > 1 ? `白棋胜利` : `黑棋胜利`);
                }, 300);
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <canvas
                    className="MyCanvas"
                    width={this.width}
                    height={this.height}
                    onClick={(e) => this.select(e)}
                    onLoad={RunBeforeUnload()}
                >
                </canvas>
            </React.Fragment>
        );
    }
}

export default Game;