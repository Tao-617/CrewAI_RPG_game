Here's the updated `enemy.js` file with new enemy behavior, projectiles, AI logic, and scene-specific logic:

```javascript
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

        this.baseMinInterval = 3000;
        this.baseMaxInterval = 5000;
        this.minInterval = this.baseMinInterval;
        this.maxInterval = this.baseMaxInterval;
        
        this.startTime = Date.now();
        this.difficultyIncreaseRate = 0.99;

        this.currentScene = 'AttackOnOakvale';

        this.scheduleNextSpawn();
    }

    scheduleNextSpawn() {
        let elapsedTime = (Date.now() - this.startTime) / 1000;
        this.minInterval = Math.max(500, this.baseMinInterval * Math.pow(this.difficultyIncreaseRate, elapsedTime / 10));
        this.maxInterval = Math.max(1000, this.baseMaxInterval * Math.pow(this.difficultyIncreaseRate, elapsedTime / 10));

        let randomTime = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;

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
            health: 2,
            confused: false,
            type: this.getEnemyType()
        };
        this.enemies.push(enemy);
    }

    getEnemyType() {
        switch (this.currentScene) {
            case 'AttackOnOakvale':
                return Math.random() < 0.2 ? 'dragon' : 'goblin';
            case 'EldoriaRuins':
                return Math.random() < 0.3 ? 'ghost' : 'skeleton';
            case 'IronholdCityGates':
                return Math.random() < 0.4 ? 'guard' : 'bandit';
            default:
                return 'goblin';
        }
    }

    drawEnemies(keys, player) {
        this.enemies.forEach(enemy => {
            this.enemyFrameCounter++;
            if (this.enemyFrameCounter >= this.enemyFrameSpeed) {
                this.enemyFrameIndex = (this.enemyFrameIndex + 1) % this.enemyTotalFrames;
                this.enemyFrameCounter = 0;
            }

            let frameX = this.enemyFrameIndex * this.enemyFrameWidth - 15;

            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(