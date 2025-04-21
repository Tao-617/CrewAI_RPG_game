
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
        this.projectiles = [];
        this.isGameOver = false;
        this.spritesheet = new Image();
        this.spritesheet.src = "images/player_walk.png";

        this.frameIndex = 0;  // Current frame index
        this.frameWidth = 125; // Single frame width (adjust based on image)
        this.frameHeight = 235; // Single frame height
        this.totalFrames = 4; // Total frames in the spritesheet
        this.frameSpeed = 8; // Number of frames before switching to the next image
        this.frameCounter = 0;
    }
    // Update player state
    updatePlayer() {
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            if (this.y >= this.canvas.height * 0.6) {
                this.y = this.canvas.height * 0.6;
                this.isJumping = false;
            }
        }
    }

 
    drawPlayer(keys) {
        if (keys.a || keys.d) {
            this.frameCounter++;
            if (this.frameCounter >= this.frameSpeed) {
                this.frameIndex = (this.frameIndex + 1) % this.totalFrames; // Loop walk animation
                this.frameCounter = 0;
            }
        } else {
            this.frameIndex = 0; // Show first frame when standing still
        }

        let frameX = this.frameIndex * this.frameWidth-15;

        this.ctx.save(); // Save current state

        if (!this.facingRight) {
            this.ctx.scale(-1, 1); // Mirror flip
            this.ctx.drawImage(
                this.spritesheet,
                frameX, 150,
                this.frameWidth, this.frameHeight,
                -this.x - this.width, this.y, // Adjust x coordinate
                this.width, this.height
            );
        } else {
            this.ctx.drawImage(
                this.spritesheet,
                frameX, 150,
                this.frameWidth, this.frameHeight,
                this.x, this.y,
                this.width, this.height
            );
        }

        this.ctx.restore(); // Restore state
    }

    // Draw blue projectiles
    drawProjectiles() {
        this.ctx.fillStyle = "#0000FF";
        this.projectiles.forEach((projectile, index) => {
            this.ctx.beginPath();
            this.ctx.arc(projectile.x, projectile.y, this.canvas.width * 0.01, 0, Math.PI * 2);
            this.ctx.fill();
            
            projectile.x += projectile.speed;

            // Remove if out of screen
            if (projectile.x > this.canvas.width || projectile.x < 0) {
                this.projectiles.splice(index, 1);
            }
        });
    }

     // Draw health bar
    drawHealthBar() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x, this.y - this.canvas.height * 0.02, this.width * (this.health / 100), this.canvas.height * 0.01);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(this.x, this.y - this.canvas.height * 0.02, this.width, this.canvas.height * 0.01);
    }

    // Draw score
    drawScore() {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.score, 20, 60);
    }

   

    updatePlayer(keys) {
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            if (this.y >= this.canvas.height * 0.6) {
                this.y = this.canvas.height * 0.6;
                this.isJumping = false;
            }
        }
    }


}
