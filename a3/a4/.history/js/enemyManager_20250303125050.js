export class EnemyManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.enemies = [];
    }

     // Your game logic here;
     spawnEnemy() {
        let enemy = {
            x: this.canvas.width + Math.random() * this.canvas.width * 0.1,
            y: this.canvas.height * 0.6,
            width: this.canvas.height * 0.2,
            height: this.canvas.height * 0.2,
            speed: this.canvas.width * 0.002,
            attackCooldown: 0,
            health: 2 
        };
        this.enemies.push(enemy);
    }

     // Draw enemies
     drawEnemies() {
        this.enemies.forEach(enemy => {
            // Calculate the current frame
            this.enemyFrameCounter++;
            if (this.enemyFrameCounter >= this.enemyFrameSpeed) {
                this.enemyFrameIndex = (this.enemyFrameIndex + 1) % this.enemyTotalFrames;
                this.enemyFrameCounter = 0;
            }

            let frameX = this.enemyFrameIndex * this.enemyFrameWidth;

            this.ctx.save(); // Save the current drawing state
            this.ctx.scale(-1, 1); // Flip horizontally
            this.ctx.drawImage(
                this.enemySpritesheet,
                frameX, 150, // Crop from spritesheet (x, y)
                this.enemyFrameWidth, this.enemyFrameHeight, // Single frame size
                -enemy.x - enemy.width, enemy.y, // **Adjust X position when flipping**
                enemy.width, enemy.height // Target drawing size
            );
            this.ctx.restore(); // Restore drawing state

            // Move enemy
            let addSpeed = (this.keys.d && this.player.x >= (this.canvas.width * 1 / 3)) ? this.player.speed : 0;
            enemy.x -= enemy.speed + addSpeed + this.distanceTraveled / 1000;

            // Generate enemy projectiles
            if (enemy.attackCooldown <= 0) {
                this.enemyProjectiles.push({
                    x: enemy.x,
                    y: enemy.y + enemy.height / 2,
                    speed: -this.canvas.width * 0.007
                });
                enemy.attackCooldown = Math.random() * 100 + 50;
            } else {
                enemy.attackCooldown--;
            }
        });
    }


    // Draw enemy projectiles (black triangle)
    drawEnemyProjectiles() {
        this.ctx.fillStyle = "#000000";
        this.enemyProjectiles.forEach((proj, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(proj.x, proj.y);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y + this.canvas.width * 0.005);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y - this.canvas.width * 0.005);
            this.ctx.closePath();
            this.ctx.fill();
            let addSpeed = (this.keys.d && this.player.x >= (this.canvas.width * 1 / 3)) ? this.player.speed : 0;
            proj.x += proj.speed - addSpeed - this.distanceTraveled / 1000;

            // Remove if out of screen
            if (proj.x < 0) {
                this.enemyProjectiles.splice(index, 1);
            }
        });
    }
    
    update(ctx, player) {
        this.enemies.forEach(enemy => {
            enemy.x -= enemy.speed;
            ctx.fillStyle = "red";
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}
