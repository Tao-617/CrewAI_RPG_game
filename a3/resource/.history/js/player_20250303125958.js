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

        this.frameIndex = 0;  // Current frame index
        this.frameWidth = 128; // Single frame width (adjust based on image)
        this.frameHeight = 235; // Single frame height
        this.totalFrames = 4; // Total frames in the spritesheet
        this.frameSpeed = 8; // Number of frames before switching to the next image
        this.frameCounter = 0;
    }
    // Update player state
    updatePlayer() {
        if (this.player.isJumping) {
            this.player.y += this.player.velocityY;
            this.player.velocityY += this.player.gravity;
            if (this.player.y >= this.canvas.height * 0.6) {
                this.player.y = this.canvas.height * 0.6;
                this.player.isJumping = false;
            }
        }
    }


    // Handle player death
    playerDeath() {
        console.log("Player has died!");
        
        this.player.health = 0; // Ensure health does not go below 0
        
        clearInterval(this.enemySpawner); // Stop enemy spawning

        // Make player "fall down"
        this.player.y += this.player.height * 0.9;
        this.player.height = this.player.height / 10;

        // Display game over screen
        this.showGameOverScreen();
        this.done = true;
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
