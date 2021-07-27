const gameDom = document.getElementsByClassName("game")[0];
const gameWidtth = parseFloat(getComputedStyle(gameDom).width);
const gameHeight = parseFloat(getComputedStyle(gameDom).height);

const skyDom = document.getElementById("sky");
const skyWidth = parseFloat(getComputedStyle(sky).width);
const skyHeight = parseFloat(getComputedStyle(sky).height);
const skyLeft = parseFloat(getComputedStyle(sky).left);
const skyTop = parseFloat(getComputedStyle(sky).top);


class Sky extends Rectangle {
    constructor(width, height, left, top, vx, vy, dom) {
        super(width, height, left, top, vx, vy, dom);
    }

    move(duration) {
        const xDis = this.vx * duration; //横向的距离
        const yDis = this.vy * duration; //纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if ((this.left + gameWidtth) <= 0) {
            this.left = 0;
        }

        this.render();
    }
}
