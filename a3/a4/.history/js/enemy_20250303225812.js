export class EnemyManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.enemies = [];

        
        this.enemySpritesheet = new Image();
        this.enemySpritesheet.src = "images/enemy.png"; // Enemy character spritesheet
        
        this.enemyProjectiles = [];

        this.enemyFrameIndex = 0; // Current animation frame for enemy
        this.enemyFrameWidth = 128; // Enemy frame width (adjust based on image)
        this.enemyFrameHeight = 235; // Enemy frame height
        this.enemyTotalFrames = 4; // Total frames in enemy spritesheet
        this.enemyFrameSpeed = 8; // Number of frames before switching to next enemy frame
        this.enemyFrameCounter = 0;

        this.startTime = Date.now(); // 记录游戏开始时间
        this.difficultyIncreaseRate = 0.99; // 每次减少 1%

        this.minInterval = 1000; // 最短 1 秒
        this.maxInterval = 5000; // 最长 5 秒
        this.scheduleNextSpawn();
    }

    scheduleNextSpawn() {
        // 计算游戏运行的时间 (秒)
        let elapsedTime = (Date.now() - this.startTime) / 1000;

        // **降低生成间隔，增加敌人生成速度**
        this.minInterval = Math.max(500, this.baseMinInterval * Math.pow(this.difficultyIncreaseRate, elapsedTime / 10));
        this.maxInterval = Math.max(1000, this.baseMaxInterval * Math.pow(this.difficultyIncreaseRate, elapsedTime / 10));

        let randomTime = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;

        console.log(`Next enemy in: ${randomTime.toFixed(0)} ms`);

        setTimeout(() => {
            this.spawnEnemy();
            this.scheduleNextSpawn();
        }, randomTime);
    }

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
    drawEnemies(keys, player) {
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
            let addSpeed = (keys.d && player.x >= (this.canvas.width * 1 / 3)) ? player.speed : 0;
            enemy.x -= enemy.speed + addSpeed;

            // Generate enemy projectiles
            if (enemy.attackCooldown <= 0) {
                this.enemyProjectiles.push({
                    x: enemy.x,
                    y: enemy.y + enemy.height / 2,
                    speed: -this.canvas.width * 0.01 -enemy.speed + addSpeed
                });
                enemy.attackCooldown = Math.random() * 100 + 50;
            } else {
                enemy.attackCooldown--;
            }
        });
    }


    // Draw enemy projectiles (black triangle)
    drawEnemyProjectiles(keys, player) {
        this.ctx.fillStyle = "#000000";
        this.enemyProjectiles.forEach((proj, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(proj.x, proj.y);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y + this.canvas.width * 0.005);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y - this.canvas.width * 0.005);
            this.ctx.closePath();
            this.ctx.fill();
            let addSpeed = (keys.d && player.x >= (this.canvas.width * 1 / 3)) ? player.speed : 0;
            proj.x += proj.speed - addSpeed;
            // Remove if out of screen
            if (proj.x < 0) {
                this.enemyProjectiles.splice(index, 1);
            }
        });
    }
}
