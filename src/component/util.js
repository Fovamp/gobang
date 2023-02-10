import { CIRCLE, ROW, COL, DX, DY } from "./const";
import { Howl } from "howler";
import chessAudio from '../chessAudio.mp3';
// import chessAudio from '/home/tuhon/acapp/game/static/js/chessAudio.mp3';

export function getGameMap(ctx, Widthstart, scale, width, height){
    ctx.fillStyle = "rgb(255,228,196)";
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(Widthstart, scale * 1);
    ctx.lineTo(Widthstart + scale * 14, scale * 1);
    ctx.closePath();
    ctx.stroke();

    for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(Widthstart + scale * i, scale * 1);
        ctx.lineTo(Widthstart + scale * i, scale * 15);
        ctx.closePath();
        ctx.stroke();
    }
    for (let i = 2; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(Widthstart, scale * i);
        ctx.lineTo(Widthstart + scale * 14, scale * i);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(Widthstart + 3 * scale, 4 * scale);
    ctx.arc(Widthstart + 3 * scale, 4 * scale, 3, 0, CIRCLE);

    ctx.moveTo(Widthstart + 11 * scale, 4 * scale);
    ctx.arc(Widthstart + 11 * scale, 4 * scale, 3, 0, CIRCLE);

    ctx.moveTo(Widthstart + 7 * scale, 8 * scale);
    ctx.arc(Widthstart + 7 * scale, 8 * scale, 3, 0, CIRCLE);

    ctx.moveTo(Widthstart + 3 * scale, 12 * scale);
    ctx.arc(Widthstart + 3 * scale, 12 * scale, 3, 0, CIRCLE);

    ctx.moveTo(Widthstart + 11 * scale, 12 * scale);
    ctx.arc(Widthstart + 11 * scale, 12 * scale, 3, 0, CIRCLE);

    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export function get2DArray(root, Value) {
    root.res = [];
    for (let i = 0; i <= ROW; i++) {
        let Array = [];
        for (let j = 0; j <= COL; j++) {
            Array[j] = Value;
        }
        root.res.push(Array);
    }
    return root.res;
}
export function getCircle(ctx, x, y, r, fillStyle) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, CIRCLE);
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.closePath();
}
export function getRealCoordinate(x, y, Widthstart, scale){
    let realX = Math.round((x - Widthstart) / scale);
    let realY = Math.round(y / scale);
    realX = realX * scale + Widthstart;
    realY = realY * scale
    return [realX, realY];
}
export function getIndex(x, y, Widthstart, scale){
    let realXIndex = Math.round((x - Widthstart) / scale);
    let realYIndex = Math.round((y - scale) / scale);
    return [realXIndex, realYIndex]
}
export function getCoordinate(i, j, Widthstart, scale){
    let x = Widthstart + i * scale;
    let y = (j + 1) * scale;
    return [x, y];
}
export function chess(root, ctx, Widthstart, scale){
    for(let i = 0; i <= 15; i ++ ){
        for(let j = 0; j <= 15; j ++ ){
            if(root.res[i][j]){
                const [x, y] = getCoordinate(i, j, Widthstart, scale);
                const gradient = chessHightlightandColor(x, y, scale, ctx, root.res[i][j])
                getCircle(ctx, x, y, (scale - 3) / 2, gradient);
            }
        }
    }
}
export function chessHightlightandColor(realX, realY, scale, ctx, select){
    let gradient = ctx.createRadialGradient(realX, realY, (scale - 3) / 2, realX - 3, realY - 3, 0);
    SelectColor(gradient, select);
    return gradient;
}
export function SelectColor(gradient, select){
    if(select === 1){
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    }else{
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    return gradient;
}
export function HowlAudio(){
    const sound = new Howl({
        src: [chessAudio],
        volume: 0.2,
        Boolean: true,
    });
    sound.play();
}
export function checkIsTransborder(x, y){
    if(x >= 0 && x < 15 && y >= 0 && y < 15){
        return true;
    }
    return false;
}
export function checkIsWin(root, x, y){
    let select = root.res[x][y];
    let size = -1;
    for(let i = 0; i < 4; i ++ ){
        let ans = -1;
        let move = 0, pos = 0, neg = 0, dir = i;
        while(checkIsTransborder(x + DX[i] * move, y + DY[i] * move) && root.res[x + DX[i] * move][y + DY[i] * move] === select){
            move ++;
            pos ++;
        }
        ans += move;
        move = 0;
        while(checkIsTransborder(x - DX[i] * move, y - DY[i] * move) && root.res[x - DX[i] * move][y - DY[i] * move] === select){
            move ++;
            neg ++;
        }
        ans += move;
        size = Math.max(size, ans);
        if(size >= 5)
            return [true, dir, pos, neg];
    }
    return [false, 0, 0, 0];
}
export function VictoryRoute(ctx, x, y, dir, pos, neg, Widthstart, scale, select){
    const [pos_x, pos_y] = getCoordinate(x + DX[dir] * pos, y + DY[dir] * pos, Widthstart, scale);
    const [neg_x, neg_y] = getCoordinate(x - DX[dir] * neg, y - DY[dir] * neg, Widthstart, scale);
    ctx.beginPath();
    ctx.moveTo(pos_x, pos_y);
    ctx.lineTo(neg_x, neg_y);
    select > 1 ? ctx.strokeStyle = 'black' : ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.closePath();
    ctx.stroke();
}
export function RunBeforeUnload(){
    window.onbeforeunload = () => {
        return "Unload";
    }
}
export function LastCountdown(ctx, x, y, select, scale, gradient, resize_time){
    let time = 16;
    let interval_id = setInterval(() =>{
        getCircle(ctx, x, y, (scale - 3) / 2 - 2, gradient);
        if(select === 1)
            ctx.fillStyle = "white";
        else
            ctx.fillStyle = "black";
        time --;
        if(time >= 10)
            ctx.fillText(time, x - 6, y + 2);
        else
            ctx.fillText(time, x - 3, y + 2);
        if(time - 1 < 0){
            clearInterval(interval_id);
            getCircle(ctx, x, y, (scale - 3) / 2 - 2, gradient);
        }
    }, 1000);
    return [interval_id, gradient, time];
}