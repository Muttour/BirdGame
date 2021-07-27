class Play {
    constructor() {
        this.timer = null;
        this.gameOver = false;
        this.sky = new Sky(skyWidth, skyHeight, skyLeft, skyTop, -20, 0, skyDom);
        this.land = new Land(landWidth, landHeigth, landLeft, landTop, -20, 0, landDom);
        this.bird = new Bird(birdWidth, birdHeigth, birdLeft, birdTop, 0, 45, birdDom, 100);
        this.pipe = new PipePareProducer(-20);

    }

    start() {
        if (this.timer)
            return;

        if (this.gameOver) {
            //重新开始游戏
            window.location.reload();
        }
        
        this.pipe.startProduce();
        this.bird.fly();

        this.timer = setInterval(() => {
            this.sky.move(16/100);
            this.land.move(16/100);
            this.bird.move(16/100);

            if (this.isGameOver()) {
                console.log("game over");
                this.stop();
                this.gameOver = true;
            }
        }, 200)

        
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.pipe.stopProduce();
        this.bird.stopfly();

    }

    event() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }
                else {
                    this.start();
                }
            }
            else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }

    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }

    isGameOver() {
        // console.log(this.pipe.arr.length);
        if (this.bird.top ==gameHeight-landHeigth-birdHeigth) {
            //鸟碰到了大地
            return true;
        }

        // if (this.bird.top ==0) {
        //     //鸟碰到了大地
        //     return true;
        // }
        
        for (let i = 0; i < this.pipe.arr.length; i++) {
            const pair = this.pipe.arr[i];
            console.log(this.pipe.arr[i]);
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.downItem) || this.isHit(this.bird, pair.upItem)){
                return true;
            }
        }
        return false;
    }
}

const playgame = new Play();
playgame.event();
