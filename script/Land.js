const landDom=document.getElementsByClassName("land")[0];
const landWidth=parseFloat(getComputedStyle(landDom).width);
const landHeigth=parseFloat(getComputedStyle(landDom).height);
const landLeft=parseFloat(getComputedStyle(landDom).left);
const landBottom=parseFloat(getComputedStyle(landDom).bottom);
const landTop=gameHeight-landHeigth;

class Land extends Rectangle{
    constructor(width, height, left, top, vx, vy, dom){
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


