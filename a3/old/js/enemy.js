Here's the updated content for `a4/js/enemy.js`:

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

        this.currentScene = "AshfallVillage";

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
        let enemyType = this.getRandomEnemyType();
        let enemy = new enemyType(this.canvas);
        this.enemies.push(enemy);
    }

    getRandomEnemyType() {
        let types = [BasicEnemy, ShieldEnemy, ElementalEnemy];
        return types[Math.floor(Math.random() * types.length)];
    }

    updateEnemies(keys, player) {
        this.enemies.forEach((enemy, index) => {
            enemy.update(keys, player);
            if (enemy.health <= 0) {
                this.enemies.splice(index, 1);
            }
        });
    }

    drawEnemies() {
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }

    updateProjectiles(keys, player) {
        this.enemyProjectiles.forEach((proj, index) => {
            proj.update(keys, player);
            if (proj.isOutOfBounds()) {
                this.enemyProjectiles.splice(index, 1);
            }
        });
    }

    drawProjectiles() {
        this.enemyProjectiles.forEach(proj => proj.draw(this.ctx));
    }

    setScene(sceneName) {
        this.currentScene = sceneName;
        // Adjust enemy behavior based on the current scene
        this.enemies.forEach(enemy => enemy.onSceneChange(sceneName));
    }
}

class Enemy {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = canvas.width + Math.random() * canvas.width * 0.1;
        this.y = canvas.height * 0.6;
        this.width = canvas.height * 0.2;
        this.height = canvas.height * 0.2;
        this.speed = canvas.width * 0