import { Player } from "./js/player.js";
import { EnemyManager } from "./js/enemy.js";
import { DialogueSystem } from "./js/dialogCtrl.js"
import { Background } from "./js/background.js";
import { HUD } from "./js/hud.js";

class GameLogic {
    constructor() {
        this.restartGame = this.restartGame.bind(this);
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.style.position = 'relative';
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.player = new Player(this.canvas);
        this.enemy = new EnemyManager(this.canvas);
        this.dialogueSystem = new DialogueSystem(this.canvas);
        this.background = new Background(this.canvas);
        this.hud = new HUD(this.canvas, this.player);
        this.isPaused = this.dialogueSystem.isPaused;
        this.done = false; // Stop the game loop
        this.keys = { a: false, d: false, s: false, k: false, j: false };


        this.distanceTraveled = 0; // Track the distance traveled by the player
        this.maxDistance = this.canvas.width * 5; // Set the maximum distance; the game ends when reached

    }
        
    // Check for collisions
    checkCollisions() {
        this.player.projectiles.forEach((proj, pIndex) => {
            this.enemy.enemies.forEach((enemy, eIndex) => {
                if (
                    proj.x < enemy.x + enemy.width &&
                    proj.x + this.canvas.width * 0.01 > enemy.x &&
                    proj.y < enemy.y + enemy.height &&
                    proj.y + this.canvas.width * 0.01 > enemy.y
                ) {
                    // Remove enemy and projectile
                    this.enemy.enemies.splice(eIndex, 1);
                    this.enemy.enemyProjectiles.splice(pIndex, 1);
                    // Increase health
                    this.player.health = Math.min(100, this.player.health + 5);
                    this.player.score += 1;
                    // Update high score
                    let highScore = localStorage.getItem("highScore") || 0;
                    if (this.player.score > highScore) 
                        localStorage.setItem("highScore", this.player.score);
                    // Update enemy spawn timer
                    clearInterval(this.enemy.enemySpawner); // Clear previous timer
                    this.enemy.enemySpawnInterval = Math.max(500, 3000 - this.player.score * 100); // Update new interval
                    this.enemy.enemySpawner = setInterval(this.spawnEnemy.bind(this), this.enemy.enemySpawnInterval); // Start new timer
                }
            });
        });
        this.enemy.enemyProjectiles.forEach((proj, epIndex) => {
            if (
                proj.x < this.player.x + this.player.width &&
                proj.x + this.canvas.width * 0.01 > this.player.x &&
                proj.y < this.player.y + this.player.height &&
                proj.y + this.canvas.width * 0.01 > this.player.y
            ) {
                // Remove enemy projectile
                this.enemy.Projectiles.splice(epIndex, 1);
                // Decrease health
                this.player.health = Math.max(0, this.player.health - 30);
                // If player health reaches 0, call `playerDeath()`
                if (this.player.health <= 0) {
                    this.switchDialog('lose');
                    this.playerDeath();
                }
            }
        });
    }

   
    // Handle reaching the goal
    reachGoal() {
        this.switchDialog('win');
        console.log("Player has reached the goal!");
        this.done = true; // Stop game loop
        clearInterval(this.enemy.enemySpawner); // Stop enemy spawning

        // Get high score
        let highScore = localStorage.getItem("highScore") || 0;
        let newHighScore = false;

        // Check if new high score is reached
        if (this.player.score == highScore) {
            localStorage.setItem("highScore", this.player.score);
            newHighScore = true;
        }

        // Display "You Win" screen
        setTimeout(() => {
            let winDiv = document.createElement("div");
            winDiv.style.position = "absolute";
            winDiv.style.top = "50%";
            winDiv.style.left = "50%";
            winDiv.style.transform = "translate(-50%, -50%)";
            winDiv.style.background = "rgba(0, 0, 0, 0.8)";
            winDiv.style.color = "white";
            winDiv.style.padding = "20px";
            winDiv.style.textAlign = "center";
            winDiv.style.fontSize = "24px";

            // Congratulations message
            let message = newHighScore ? `<p>🎉 Congratulations! New High Score! 🎉</p>` : "";

            winDiv.innerHTML = `
                You Win!<br>
                Distance: ${this.distanceTraveled}<br>
                <br>Score: ${this.player.score}<br>
                ${message} <!-- Congratulations message -->
                <button id='restart-button'>Restart</button>
            `;

            document.body.appendChild(winDiv);

            document.getElementById("restart-button").addEventListener("click", this.restartGame.bind(this));
        }, 500);
    }

    // Show game over screen
    showGameOverScreen() {
        setTimeout(() => {
            let highScore = localStorage.getItem("highScore") || 0;
            let newHighScore = this.player.score == highScore;

            if (newHighScore) {
                localStorage.setItem("highScore", this.player.score); // Update high score
            }

            let message = newHighScore ? "<br>🎉 Congratulations! New High Score! 🎉<br>" : "";

            let gameOverDiv = document.createElement("div");
            gameOverDiv.style.position = "absolute";
            gameOverDiv.style.top = "50%";
            gameOverDiv.style.left = "50%";
            gameOverDiv.style.transform = "translate(-50%, -50%)";
            gameOverDiv.style.background = "rgba(0, 0, 0, 0.8)";
            gameOverDiv.style.color = "white";
            gameOverDiv.style.padding = "20px";
            gameOverDiv.style.textAlign = "center";
            gameOverDiv.style.fontSize = "24px";
            gameOverDiv.innerHTML = `
                Game Over!<br>Score: ${this.player.score}<br>
                ${message}
                <button id='restart-button'>Restart</button>
            `;
            document.body.appendChild(gameOverDiv);

            document.getElementById("restart-button").addEventListener("click", this.restartGame.bind(this));
        }, 500);
    }
    // Restart game
    restartGame() {
        location.reload();
    }

    // Control movement of grass and clouds
    moveObjects() {
        if (this.keys.d && this.player.x >= (this.canvas.width * 1 / 3)) {
            this.player.x = this.canvas.width * 1 / 3;
            // Increase distance traveled when moving right
            this.distanceTraveled += this.player.speed;

            this.grassPatches.forEach(grass => {
                grass.x -= this.player.speed;
                if (grass.x < -this.canvas.width * 0.1) {
                    grass.x = this.canvas.width + Math.random() * 50;
                    grass.y = this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.4;
                }
            });
            this.clouds.forEach(cloud => {
                cloud.x -= this.player.speed * 0.5;
                if (cloud.x < -this.canvas.width * 0.1) {
                    cloud.x = this.canvas.width + Math.random() * this.canvas.width * 0.05 + this.canvas.width * 0.1;
                    cloud.y = Math.random() * this.canvas.height * 0.3;
                }
            });
        } else if (this.keys.d) {
            this.player.x += this.player.speed;
        } else if (this.keys.a && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        // If distance reaches 10000, the game ends
        if (this.distanceTraveled >= this.maxDistance) {
            this.reachGoal();
        }
    }
    
    update() {
        if (this.isPaused) {
            return; // Skip update logic when the game is paused
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.drawBackground();
        this.background.moveObjects();
        this.player.updatePlayer();
        this.player.drawPlayer();
        this.player.drawProjectiles();
        this.enemy.drawEnemies();
        this.enemy.drawEnemyProjectiles();
        this.checkCollisions();
        this.player.drawHealthBar();
        this.hud.updateHUD();
        this.dialogueSystem.triggerDialogue();
        this.isPaused = this.dialogueSystem.isPaused;
    }

    // Handle key press
    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.showDialogLine();
        }
        if (this.player.health > 0) {
            if (event.key === "d") {
                this.keys.d = true;
                this.player.facingRight = true; // face right
            }
            if (event.key === "a") {
                this.keys.a = true;
                this.player.facingRight = false; // face left
            }
            if (event.key === "k" && !this.player.isJumping) {
                this.player.isJumping = true;
                this.player.velocityY = -this.canvas.height * 0.02;
            }
            if (event.key === "j" && !this.player.isAttacking) {
                this.keys.j = true;
                this.player.isAttacking = true;

                // Generate projectile
                let projectile = {
                    x: this.player.facingRight ? this.player.x + this.player.width : this.player.x,
                    y: this.player.y + this.player.height / 2,
                    speed: this.player.facingRight ? this.canvas.width * 0.01 : -this.canvas.width * 0.01
                };
                this.player.projectile.push(projectile);

                setTimeout(() => { this.player.isAttacking = false; }, 1000);
            }
        }
    }

    // Handle key release
    handleKeyUp(event) {
        if (event.key === "d") this.keys.d = false;
        if (event.key === "a") this.keys.a = false;
        if (event.key === "j") this.keys.j = false;
        
    }
}
