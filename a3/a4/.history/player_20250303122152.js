export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.x = canvas.width * 0.33;
        this.y = canvas.height * 0.6;
        this.width = canvas.height * 0.2;
        this.height = canvas.height * 0.2;
        this.speed = canvas.width * 0.005;
        this.isJumping = false;
        this.velocityY = 0;
        this.gravity = canvas.height * 0.001;
        this.facingRight = true;
        this.health = 100;
        this.score = 0;
        this.isAttacking = false;

        this.spritesheet = new Image();
        this.spritesheet.src = "images/player_walk.png";

        this.frameIndex = 0;
        this.frameSpeed = 8;
        this.frameCounter = 0;
    }

    update(keys) {
        if (keys.d) {
            this.x += this.speed;
            this.facingRight = true;
        }
        if (keys.a) {
            this.x -= this.speed;
            this.facingRight = false;
        }
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            if (this.y >= this.canvas.height * 0.6) {
                this.y = this.canvas.height * 0.6;
                this.isJumping = false;
            }
        }
        this.draw();
    }

    handleKeyDown(event, keys) {
        if (event.key === "d") keys.d = true;
        if (event.key === "a") keys.a = true;
        if (event.key === "k" && !this.isJumping) {
            this.isJumping = true;
            this.velocityY = -this.canvas.height * 0.02;
        }
    }

    handleKeyUp(event, keys) {
        if (event.key === "d") keys.d = false;
        if (event.key === "a") keys.a = false;
    }

    draw() {
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
