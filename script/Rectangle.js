class Rectangle {
    constructor(width, height, left, top, vx, vy, dom) {
        console.log(dom);
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.vx = vx;
        this.vy = vy;
        this.dom = dom;
        this.render();

    }

    move(duration) {
        const xDis = this.vx * duration; //横向的距离
        const yDis = this.vy * duration; //纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;
        console.log('move');
        this.render();
        
    }

    render() {
        this.dom.style.width = this.width+'px' ;
        this.dom.style.height = this.height+'px';
        this.dom.style.left = this.left+'px';
        this.dom.style.top = this.top+'px';
        console.log('render');
    }
}

