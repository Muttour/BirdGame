const birdDom = document.getElementsByClassName("bird")[0];
const birdWidth = parseFloat(getComputedStyle(birdDom).width);
const birdHeigth = parseFloat(getComputedStyle(birdDom).height);
const birdLeft = parseFloat(getComputedStyle(birdDom).left);
const birdTop = parseFloat(getComputedStyle(birdDom).top);
const min = birdHeigth;
const max = skyHeight - landHeigth - birdHeigth;

class Bird extends Rectangle {
    constructor(width, height, left, top, vx, vy, dom, a) {
        super(width, height, left, top, vx, vy, dom);
        this.a = a;
        this.swing = 1;
        this.timer = null;

    }

    move(duration) {
        this.vy = this.a + this.vy;
        
        const xDis = this.vx * duration; //横向的距离
        const yDis = this.vy * duration; //纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if (this.top <= min) {
            this.top = birdHeigth;
        }

        if (this.top >= max) {
            this.top = skyHeight - landHeigth - birdHeigth;
        }

        this.render();

    }

    fly() {
        if (this.timer)
            return;

        this.timer = setInterval(
            () => {
                this.swing = this.swing % 3 + 1;
                birdDom.className = `bird swing${this.swing}`;
            }
        ,200)
    }

    stopfly(){
        clearInterval(this.timer);
        this.timer=null;
    }

    jump() {
        this.vy =  -450;
    }

}
