export class EnemyManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.enemies = [];

        
        this.enemySpritesheet = new Image();
        this.enemySpritesheet.src = "images/enemy.png"; // Enemy character spritesheet
        
        this.enemies = [];
        this.enemyProjectiles = [];

        this.enemyFrameIndex = 0; // Current animation frame for enemy
        this.enemyFrameWidth = 128; // Enemy frame width (adjust based on image)
        this.enemyFrameHeight = 235; // Enemy frame height
        this.enemyTotalFrames = 4; // Total frames in enemy spritesheet
        this.enemyFrameSpeed = 8; // Number of frames before switching to next enemy frame
        this.enemyFrameCounter = 0;


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

     
    
    update(ctx, player) {
        this.enemies.forEach(enemy => {
            enemy.x -= enemy.speed;
            ctx.fillStyle = "red";
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}
