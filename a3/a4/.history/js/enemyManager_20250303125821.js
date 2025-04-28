export class EnemyManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.enemies = [];
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
