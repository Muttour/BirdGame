// const space=80;

function random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Pipe extends Rectangle {
    constructor(width, height, left, top, vx, vy, dom) {
        super(width, height, left, top, vx, vy, dom)
        // console.log(dom);
    }

    move(duration) {
        const xDis = this.vx * duration; //横向的距离
        const yDis = this.vy * duration; //纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if (this.left + this.width <= 0) {
            this.dom.remove();
            return;
        }

        this.render();
    }
}

class ProducePipe {
    constructor(width) {
        this.width = width;
        this.spaceHeight = 150; //空隙位置的高度
        this.minHeight = 80; //水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        this.upDom = null;
        this.downDom = null;

        this.upHeight = random(this.maxHeight, this.minHeight);
        console.log(this.upHeight)
        if (this.upHeight > this.maxHeight) {
            this.upHeight = this.maxHeight;
        }

        this.downHeight = landTop - this.upHeight - this.spaceHeight;
        console.log(this.downHeight)


        this.upDom = document.createElement("div");
        gameDom.appendChild(this.upDom);
        this.upDom.className = "pipe up"
        this.upDom.style.height = this.upHeight + 'px';
        this.upItem = new Pipe(52, this.upHeight, gameWidtth, 0, -100, 0, this.upDom);
        // width, height, left, top, vx, vy, dom
        this.downDom = document.createElement("div");
        gameDom.appendChild(this.downDom);
        this.downDom.className = "pipe down"
        this.downDom.style.height = this.downHeight + 'px';
        this.downItem = new Pipe(52, this.downHeight, gameWidtth, gameHeight - landHeigth - this.downHeight, -100, 0, this.downDom);

    }

    /**
     * 该柱子对是否已经移出了视野
     */
    get useLess() {
        return this.upItem.left < -this.upItem.width;
    }

}

class PipePareProducer {
    constructor(v) {
        this.v = v;
        this.arr = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {

            this.arr.push(new ProducePipe(52));

            for (let i = 0; i < this.arr.length; i++) {
                this.arr[i].upItem.move(1);
                this.arr[i].downItem.move(1);
            }

            //移除掉用不到的柱子
            for (let i = 0; i < this.arr.length; i++) {
                var pair = this.arr[i];
                if (pair.useLess) {
                    //没用的柱子对
                    this.arr.splice(i, 1);
                    i--;
                }
            }
        }, 1500)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }


}

// const pipe = new PipePareProducer(-20);
// pipe.startProduce();

// setInterval(function () {


// }, 200);
