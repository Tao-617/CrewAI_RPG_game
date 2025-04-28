export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.state = "day";
    }

    draw(ctx) {
        ctx.fillStyle = this.state === "day" ? "#87CEEB" : "#191970";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
