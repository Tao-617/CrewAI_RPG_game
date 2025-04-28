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

    /** 
     * 画敌人
     * @param {array} enemies - 敌人数组
     * @param {Image} spritesheet - 敌人精灵图
     */
    drawEnemies(enemies, spritesheet) {
        enemies.forEach(enemy => {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                spritesheet,
                enemy.frameIndex * 128, 150,
                128, 235,
                -enemy.x - enemy.width, enemy.y,
                enemy.width, enemy.height
            );
            this.ctx.restore();
        });
    }

    /** 
     * 画玩家子弹
     * @param {array} projectiles - 玩家子弹数组
     */
    drawProjectiles(projectiles) {
        this.ctx.fillStyle = "#0000FF"; // 蓝色子弹
        projectiles.forEach(proj => {
            this.ctx.beginPath();
            this.ctx.arc(proj.x, proj.y, this.canvas.width * 0.01, 0, Math.PI * 2);
            this.ctx.fill();
        });
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

    /** 
     * 画血条
     * @param {object} player - 玩家对象
     */
    drawHealthBar(player) {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(player.x, player.y - this.canvas.height * 0.02, player.width * (player.health / 100), this.canvas.height * 0.01);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(player.x, player.y - this.canvas.height * 0.02, player.width, this.canvas.height * 0.01);
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
}
