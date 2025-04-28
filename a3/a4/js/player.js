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
        this.isGameOver = false;

        this.spritesheet = new Image();
        this.spritesheet.src = "images/player_walk.png";

        this.frameIndex = 0;
        this.frameWidth = 125;
        this.frameHeight = 235;
        this.totalFrames = 4;
        this.frameSpeed = 8;
        this.frameCounter = 0;

        this.projectiles = []; // 技能飞行物
        this.skillIcons = {
            fire: new Image(),
            water: new Image(),
            magic: new Image(),
            bigLight: new Image(),
            swordSwing: new Image(),
            sword: new Image()
        };

        // 加载武器图标
        this.skillIcons.fire.src = "images/weapons/fire_ball.png";
        this.skillIcons.water.src = "images/weapons/water_ball.png";
        this.skillIcons.magic.src = "images/weapons/magic_ball.png";
        this.skillIcons.bigLight.src = "images/weapons/big_ball.png";
        this.skillIcons.sword.src= "images/weapons/sword_of_flames.png";
    }

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
                this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
                this.frameCounter = 0;
            }
        } else {
            this.frameIndex = 0;
        }

        let frameX = this.frameIndex * this.frameWidth - 15;

        this.ctx.save();
        if (!this.facingRight) {
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                this.spritesheet,
                frameX, 150,
                this.frameWidth, this.frameHeight,
                -this.x - this.width, this.y,
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
        this.ctx.restore();
    }

    drawProjectiles() {
        this.projectiles.forEach((projectile, index) => {
            if (projectile.isSwordAttack) {
                // 特别处理挥剑
                this.ctx.save();
    
                // 平移到剑柄位置
                this.ctx.translate(projectile.x, projectile.y);
             
                if(!projectile.facingRight) 
                    this.ctx.scale(-1, 1);
                // 旋转
                this.ctx.rotate(projectile.rotation);
    
                // 画剑（注意调整offset，使剑柄对齐旋转中心）
                this.ctx.drawImage(
                    projectile.image, 
                    projectile.offsetX, // 剑柄对齐
                    -projectile.offsetY,
                    projectile.width,
                    projectile.height
                );
    
                this.ctx.restore();
    
                // 挥剑动画更新
                projectile.rotation += projectile.rotationSpeed;
                projectile.life -= 1;
                if (projectile.life <= 0) {
                    this.projectiles.splice(index, 1);
                }
            } else {
                // 普通飞行技能
                this.ctx.save();

                // 如果是向左飞，需要镜像绘制
                if (!projectile.facingRight) {
                    this.ctx.translate(projectile.x + projectile.size, projectile.y); // 注意镜像时需要平移
                    this.ctx.scale(-1, 1);
                    this.ctx.drawImage(
                        projectile.image,
                        0, 0,
                        projectile.size, projectile.size
                    );
                } else {
                    // 正常绘制
                    this.ctx.drawImage(
                        projectile.image,
                        projectile.x,
                        projectile.y,
                        projectile.size,
                        projectile.size
                    );
                }

                this.ctx.restore();

                // 根据朝向决定飞行方向
                projectile.x += projectile.facingRight ? projectile.speed : -projectile.speed;

                // 飞出屏幕后销毁
                if (projectile.x > this.canvas.width || projectile.x < 0) {
                    this.projectiles.splice(index, 1);
                }
            }
        });
    }
    
    

    drawHealthBar() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x, this.y - this.canvas.height * 0.02, this.width * (this.health / 100), this.canvas.height * 0.01);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(this.x, this.y - this.canvas.height * 0.02, this.width, this.canvas.height * 0.01);
    }

    drawScore() {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.score, 20, 60);
    }

    /** 技能1：发射火球 */
    castFireBall() {
        this.projectiles.push({
            x: this.facingRight ? this.x + this.width : this.x,
            y: this.y ,
            speed: this.canvas.width * 0.01,
            image: this.skillIcons.fire,
            size: this.canvas.width * 0.12,
            facingRight: this.facingRight
        });
    }

    /** 技能2：发射水球 */
    castWaterBall() {
        this.projectiles.push({
            x: this.facingRight ? this.x + this.width : this.x,
            y: this.y ,
            speed: this.canvas.width * 0.008,
            image: this.skillIcons.water,
            size: this.canvas.width * 0.12,
            facingRight: this.facingRight
        });
    }

    /** 技能3：发射紫色魔法球 */
    castMagicBall() {
        this.projectiles.push({
            x: this.facingRight ? this.x + this.width : this.x,
            y: this.y,
            speed: this.canvas.width * 0.012,
            image: this.skillIcons.magic,
            size: this.canvas.width * 0.12,
            facingRight: this.facingRight
        });
    }

    /** 技能4：挥动剑（近战挥砍动画） */
    swordAttack() {
        this.projectiles.push({
            x: this.facingRight ? this.x + this.width : this.x, // 剑柄位置
            y: this.y + this.height * 0.5,
            speed: 0,
            image: this.skillIcons.sword,
            width: this.canvas.width * 0.2,
            height: this.canvas.width * 0.2,
            rotation: this.facingRight ? -Math.PI / 4 : -Math.PI / 3, // 初始倾斜45度
            rotationSpeed: this.facingRight ? 0.1 : 0.1, // 顺时针或逆时针
            offsetX: this.canvas.width * 0.2 * 0.15,    // 旋转时剑柄在 (0,0)
            offsetY: this.canvas.width * 0.2 * 0.85, // 剑柄位置偏移（靠下）
            isHolding: true,
            isSwordAttack: true,
            facingRight: this.facingRight,
            life: 15 // 挥剑持续几帧
        });
    }
    

    /** 技能5：发射大光球（终极技能） */
    castBigLightBall() {
        this.projectiles.push({
            x: this.facingRight ? this.x + this.width : this.x,
            y: this.y - 0.5 * this.height,
            isHolding: true,
            speed: this.canvas.width * 0.006,
            image: this.skillIcons.bigLight,
            size: this.height * 1.5,
            facingRight: this.facingRight
        });
    }
}
