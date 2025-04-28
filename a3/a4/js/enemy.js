export class EnemyManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.enemies = [];

        this.enemySpritesheet = new Image();
        this.enemySpritesheet.src = "images/enemy.png";

        this.enemyProjectiles = [];

        this.enemyFrameIndex = 0;
        this.enemyFrameWidth = 128;
        this.enemyFrameHeight = 235;
        this.enemyTotalFrames = 4;
        this.enemyFrameSpeed = 8;
        this.enemyFrameCounter = 0;
        

        this.lastScene = '';
    }

    spawnEnemies(distanceTraveled) {
        // 根据 traveled 距离来决定刷怪
        const spawnEvery = 1000; // 每走 1000 px 生成一波敌人
        const enemiesPerWave = 3; // 每波刷 3 个敌人，可以自己调整
    
        // 计算当前应该刷多少波
        const expectedWaves = Math.floor(distanceTraveled / spawnEvery);
    
        // 如果已经生成的敌人数量不够，继续生成
        if (this.lastSpawnWave === undefined) {
            this.lastSpawnWave = -1;
        }
    
        if (expectedWaves > this.lastSpawnWave) {
            this.lastSpawnWave = expectedWaves;
    
            let spawned = 0;
            const spawnInterval = 300; // 每隔 300ms刷一个
            const spawnTimer = setInterval(() => {
                if (spawned >= enemiesPerWave) {
                    clearInterval(spawnTimer);
                    return;
                }
                this.spawnEnemy();
                spawned++;
            }, spawnInterval);
        }
    }
    

    spawnEnemy() {
        let enemy = {
            x: this.canvas.width + Math.random() * this.canvas.width * 0.1,
            y: this.canvas.height * 0.6,
            width: this.canvas.height * 0.2,
            height: this.canvas.height * 0.2,
            speed: this.canvas.width * 0.002,
            attackCooldown: 0,
            health: 20,
            facingRight: false, // 默认面向左
            // 新增跳跃逻辑
            isJumping: false,
            velocityY: 0,
            gravity: this.canvas.height * 0.0015,

            // 随机跳跃计时器
            jumpCooldown: Math.random() * 200 + 100
        };
        this.enemies.push(enemy);
    }

    drawEnemies(keys, player) {
        this.enemies.forEach(enemy => {
            // 动画更新
            this.enemyFrameCounter++;
            if (this.enemyFrameCounter >= this.enemyFrameSpeed) {
                this.enemyFrameIndex = (this.enemyFrameIndex + 1) % this.enemyTotalFrames;
                this.enemyFrameCounter = 0;
            }
    
            let frameX = this.enemyFrameIndex * this.enemyFrameWidth - 15;
    
            // 🛠 绘制之前，动态决定朝向
            this.ctx.save();
            if (enemy.facingRight) {
                this.ctx.scale(1, 1);
                this.ctx.drawImage(
                    this.enemySpritesheet,
                    frameX, 150,
                    this.enemyFrameWidth, this.enemyFrameHeight,
                    enemy.x, enemy.y,
                    enemy.width, enemy.height
                );
            } else {
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(
                    this.enemySpritesheet,
                    frameX, 150,
                    this.enemyFrameWidth, this.enemyFrameHeight,
                    -enemy.x - enemy.width, enemy.y,
                    enemy.width, enemy.height
                );
            }
            this.ctx.restore();
    
            // ⚔️ 追逐玩家逻辑
            if (!enemy.isJumping) {
                if (enemy.x > player.x + player.width) {
                    enemy.x -= enemy.speed;
                    enemy.facingRight = false; // 向左看
                } else if (enemy.x + enemy.width < player.x) {
                    enemy.x += enemy.speed;
                    enemy.facingRight = true; // 向右看
                }
            }
    
            // ✨ 跳跃逻辑
            if (enemy.isJumping) {
                enemy.x += enemy.jumpSpeedX;
                enemy.y += enemy.velocityY;
                enemy.velocityY += enemy.gravity;
    
                if (enemy.y >= this.canvas.height * 0.6) {
                    enemy.y = this.canvas.height * 0.6;
                    enemy.isJumping = false;
                    enemy.jumpSpeedX = 0;
                }
            } else {
                enemy.jumpCooldown--;
                if (enemy.jumpCooldown <= 0) {
                    const distanceX = player.x - enemy.x;
                    enemy.isJumping = true;
                    enemy.velocityY = -this.canvas.height * 0.03;
                    enemy.jumpSpeedX = (distanceX > 0) ? this.canvas.width * 0.007 : -this.canvas.width * 0.007;
                    enemy.jumpCooldown = Math.random() * 200 + 10;
                }
            }
    
            // 🎯 射击逻辑
            if (enemy.attackCooldown <= 0) {
                this.enemyProjectiles.push({
                    x: enemy.x,
                    y: enemy.y + enemy.height / 2,
                    speed: -this.canvas.width * 0.01 - enemy.speed
                });
                enemy.attackCooldown = Math.random() * 100 + 50;
            } else {
                enemy.attackCooldown--;
            }
        });
    }
    
    

    drawEnemyProjectiles(keys, player) {
        this.ctx.fillStyle = "#000000";
        this.enemyProjectiles.forEach((proj, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(proj.x, proj.y);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y + this.canvas.width * 0.005);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y - this.canvas.width * 0.005);
            this.ctx.closePath();
            this.ctx.fill();

            proj.x += proj.speed;
            if (proj.x < 0) {
                this.enemyProjectiles.splice(index, 1);
            }
        });
    }
}
