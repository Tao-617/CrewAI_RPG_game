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
        this.canDoubleJump = true;
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

        // New abilities
        this.mana = 100;
        this.comboCounter = 0;
        this.comboTimer = 0;
        this.spells = {
            fireball: { manaCost: 20, damage: 30, cooldown: 0 },
            iceBlast: { manaCost: 30, damage: 40, cooldown: 0 },
            lightningStrike: { manaCost: 50, damage: 60, cooldown: 0 }
        };
    }

    updatePlayer(keys) {
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            if (this.y >= this.canvas.height * 0.6) {
                this.y = this.canvas.height * 0.6;
                this.isJumping = false;
                this.canDoubleJump = true;
            }
        }

        // Double jump
        if (keys.w && !this.isJumping && this.canDoubleJump) {
            this.velocityY = -this.canvas.height * 0.02;
            this.isJumping = true;
            this.canDoubleJump = false;
        }

        // Movement
        if (keys.a) this.moveLeft();
        if (keys.d) this.moveRight();

        // Attack
        if (keys.j) this.attack();

        // Cast spell
        if (keys.k) this.castSpell('fireball');
        if (keys.l) this.castSpell('iceBlast');
        if (keys.m) this.castSpell('lightningStrike');

        // Update combo
        this.updateCombo();

        // Regenerate mana
        this.regenerateMana();

        // Update spell cooldowns
        this.updateSpellCooldowns();
    }

    moveLeft() {
        this.x -= this.speed;
        this.facingRight = false;
    }

    moveRight() {
        this.x += this.speed;
        this.facingRight = true;
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.comboCounter++;
            this.comboTimer = 60; // Reset combo timer (assuming 60 fps)

            // Create a melee attack hitbox
            let hitbox = {
                x: this.facingRight ? this.x + this.width : this.x - this.width * 0.5,
                y: this