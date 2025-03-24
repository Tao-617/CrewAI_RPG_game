export class Drawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    /** 
     * 清空画布
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** 
     * 画背景
     * @param {string} state - 背景状态（day, night, storm, sunset）
     */
    drawBackground(state) {
        if (state === "day") {
            this.ctx.fillStyle = "#87CEEB"; // 天蓝色
        } else if (state === "night") {
            this.ctx.fillStyle = "#191970"; // 深蓝色
        } else if (state === "storm") {
            this.ctx.fillStyle = "#2F4F4F"; // 暗灰色
        } else if (state === "sunset") {
            this.ctx.fillStyle = "#FF8C00"; // 橙色
        }
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** 
     * 画玩家
     * @param {object} player - 玩家对象
     * @param {Image} spritesheet - 玩家精灵图
     */
    drawPlayer(player, spritesheet) {
        this.ctx.save();
        if (!player.facingRight) {
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                spritesheet,
                player.frameIndex * 128, 150, // 取精灵图的部分
                128, 235,
                -player.x - player.width, player.y,
                player.width, player.height
            );
        } else {
            this.ctx.drawImage(
                spritesheet,
                player.frameIndex * 128, 150,
                128, 235,
                player.x, player.y,
                player.width, player.height
            );
        }
        this.ctx.restore();
    }

     // Draw lightning
     drawLightning() {
        const startX = Math.random() * this.canvas.width; // Lightning starting position (random X location)
        const startY = 0; // Starts from the top of the sky
        const endY = this.canvas.height * 0.6; // Ends near the ground

        this.ctx.strokeStyle = "#FFFF33"; // Bright yellow lightning
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);

        let x = startX, y = startY;
        for (let i = 0; i < 8; i++) { // 8 segments to create a zigzag effect
            x += (Math.random() - 0.5) * 80; // Random lateral shifts
            y += (endY - startY) / 8; // Moves downward
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }

    /** 
     * 画敌人
     * @param {array} enemies - 敌人数组
     * @param {Image} spritesheet - 敌人精灵图
     */
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
    /** 
     * 画玩家子弹
     * @param {array} projectiles - 玩家子弹数组
     */
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
    

    drawPlayer() {
        if (this.keys.a || this.keys.d) {
            this.frameCounter++;
            if (this.frameCounter >= this.frameSpeed) {
                this.frameIndex = (this.frameIndex + 1) % this.totalFrames; // Loop walk animation
                this.frameCounter = 0;
            }
        } else {
            this.frameIndex = 0; // Show first frame when standing still
        }

        let frameX = this.frameIndex * this.frameWidth;

        this.ctx.save(); // Save current state

        if (!this.player.facingRight) {
            this.ctx.scale(-1, 1); // Mirror flip
            this.ctx.drawImage(
                this.spritesheet,
                frameX, 150,
                this.frameWidth, this.frameHeight,
                -this.player.x - this.player.width, this.player.y, // Adjust x coordinate
                this.player.width, this.player.height
            );
        } else {
            this.ctx.drawImage(
                this.spritesheet,
                frameX, 150,
                this.frameWidth, this.frameHeight,
                this.player.x, this.player.y,
                this.player.width, this.player.height
            );
        }

        this.ctx.restore(); // Restore state
    }

    /** 
     * 画敌人子弹
     * @param {array} enemyProjectiles - 敌人子弹数组
     */
    drawEnemyProjectiles(enemyProjectiles) {
        this.ctx.fillStyle = "#000000"; // 黑色子弹
        enemyProjectiles.forEach(proj => {
            this.ctx.beginPath();
            this.ctx.moveTo(proj.x, proj.y);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y + this.canvas.width * 0.005);
            this.ctx.lineTo(proj.x + this.canvas.width * 0.01, proj.y - this.canvas.width * 0.005);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

   
    // Draw grass (triangle)
    drawGrass(x, y) {
        this.ctx.fillStyle = "#228B22";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - this.canvas.width * 0.005, y + this.canvas.width * 0.02);
        this.ctx.lineTo(x + this.canvas.width * 0.005, y + this.canvas.width * 0.02);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Draw cloud (ellipse)
    drawCloud(x, y, width, height) {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }
     /** 
     * 画血条
     * @param {object} player - 玩家对象
     */
    // Draw health bar
    drawHealthBar() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.player.x, this.player.y - this.canvas.height * 0.02, this.player.width * (this.player.health / 100), this.canvas.height * 0.01);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(this.player.x, this.player.y - this.canvas.height * 0.02, this.player.width, this.canvas.height * 0.01);
    }

    // Draw score
    drawScore() {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.player.score, 20, 60);
    }


    updateHUD() {
        const hud = document.getElementById("hud");
        hud.innerHTML = `
            <div>Health: ${this.player.health}%</div>
            <div>Score: ${this.player.score}</div>
            <div>Distance: ${Math.round(this.distanceTraveled)} / ${this.maxDistance}</div>
            <div>High Score: ${localStorage.getItem("highScore") || 0}</div>
        `;
    }

    /** 
     * 画分数
     * @param {number} score - 玩家得分
     */
    drawScore(score) {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Score: ${score}`, 20, 60);
    }


     // **Draw the moon**
     drawMoon() { 
        const ctx = this.ctx;
        const moonX = this.canvas.width * 0.8;
        const moonY = this.canvas.height * 0.1;
        const moonRadius = this.canvas.width * 0.04;

        // 绘制主月亮（浅黄色）
        ctx.fillStyle = "#F0E68C"; 
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // 使用 destination-out 扣掉月亮的一部分，形成弯月轮廓
        ctx.globalCompositeOperation = "destination-out"; 
        ctx.beginPath();
        ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // 恢复默认合成模式
        ctx.globalCompositeOperation = "source-over";

        // 在扣除区域绘制深蓝色小圆，形成另一种颜色的覆盖
        ctx.fillStyle = "#191970"; 
        ctx.beginPath();
        ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw the sun
    drawSun(x, y, radius) {
        this.ctx.fillStyle = "#FFD700";
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    // **Draw rain**
    drawRain() {
        this.ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            this.ctx.fillRect(x, y, 2, 10);
        }
    }

}
