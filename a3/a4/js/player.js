```javascript
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

        this.frameIndex = 0;
        this.frameWidth = 125;
        this.frameHeight = 235;
        this.totalFrames = 4;
        this.frameSpeed = 8;
        this.frameCounter = 0;

        // New properties for enhanced abilities
        this.canDoubleJump = true;
        this.magicPower = 100;
        this.isUsingTelepathy = false;
        this.comboAttackCounter = 0;
        this.lastAttackTime = 0;
    }

    updatePlayer(keys, currentScene) {
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            if (this.y >= this.canvas.height * 0.6) {
                this.y = this.canvas.height * 0.6;
                this.isJumping = false;
                this.canDoubleJump = true;
            }
        }

        // Scene-specific abilities
        switch (currentScene) {
            case 'AttackOnOakvale':
                if (keys.t && !this.isUsingTelepathy) {
                    this.telepathy();
                }
                break;
            case 'EldoriaRuins':
                if (keys.e) {
                    this.activateRune();
                }
                break;
            case 'IronholdCityGates':
                if (keys.p) {
                    this.startPersuasionChallenge();
                }
                break;
        }

        // New input keys
        if (keys.space && !this.isJumping) {
            this.jump();
        } else if (keys.space && this.isJumping && this.canDoubleJump) {
            this.doubleJump();
        }

        if (keys.shift && Date.now() - this.lastAttackTime > 500) {
            this.comboAttack();
        }

        if (keys.q && this.magicPower >= 10) {
            this.castMagic();
        }
    }

    drawPlayer(keys) {
        // Existing drawing logic...

        // Draw magic power bar
        this.ctx.fillStyle = "#0000FF";
        this.ctx.fillRect(this.x, this.y - this.canvas.height * 0.04, this.width * (this.magicPower / 100), this.canvas.height * 0.01);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(this.x, this.y - this.canvas.height * 0.04, this.width, this.canvas.height * 0.01);

        // Existing health bar and score drawing...
    }

    jump() {
        this.isJ