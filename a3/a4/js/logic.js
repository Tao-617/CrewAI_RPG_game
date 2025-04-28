import { Player } from "./player.js";
import { EnemyManager } from "./enemy.js";
import { DialogueSystem } from "./dialogCtrl.js"
import { Background } from "./background.js";
import { HUD } from "./HUD.js";

export class GameLogic {
    constructor() {
        this.restartGame = this.restartGame.bind(this);
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.style.position = 'relative';
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.player = new Player(this.canvas);
        this.enemy = new EnemyManager(this.canvas);
        this.background = new Background(this.canvas);
        this.dialogueSystem = new DialogueSystem(this.canvas, this.background);
        this.hud = new HUD(this.canvas, this.player);
        this.isPaused = this.dialogueSystem.isPaused;
        this.done = this.player.done; // Stop the game loop
        this.keys = { a: false, d: false, s: false, k: false, j: false };


        this.distanceTraveled = 0; // Track the distance traveled by the player
        this.maxScore = 2000; // Set the maximum distance; the game ends when reached
            
    }
        
    updateHUD() {
        const hud = document.getElementById("hud");
        hud.innerHTML = `
            <div>Health: ${this.player.health}%</div>
            <div>Score: ${this.player.score}</div>
            <div>Distance: ${Math.round(this.distanceTraveled)}</div>
            <div>High Score: ${localStorage.getItem("highScore") || 0}</div>
        `;
    }

    // Check for collisions
    checkCollisions() {
        this.player.projectiles.forEach((proj, pIndex) => {
            this.enemy.enemies.forEach((enemy, eIndex) => {
                // 计算技能的真实 hitbox
                const projWidth = proj.width || (proj.size || this.canvas.width * 0.05);
                const projHeight = proj.height || (proj.size || this.canvas.width * 0.05);
    
                let projX = proj.x;
                let projY = proj.y;
    
                // 如果是旋转技能（比如剑），可以扩大一点碰撞区域（简单粗暴处理）
                let expand = proj.isSwordAttack ? 1.5 : 1.0;
    
                if (
                    projX < enemy.x + enemy.width &&
                    projX + projWidth * expand > enemy.x &&
                    projY < enemy.y + enemy.height &&
                    projY + projHeight * expand > enemy.y
                ) {
                    // 命中逻辑
                    if(proj.isSwordAttack)
                        enemy.health-= 0.2;
                    else enemy.health--;
                    if (enemy.health <= 0) {
                        this.enemy.enemies.splice(eIndex, 1);
                    }
                    if(!proj.isHolding)
                        this.player.projectiles.splice(pIndex, 1);
    
                    this.player.health = Math.min(100, this.player.health + 5);
                    this.player.score += 1;
    
                    let highScore = localStorage.getItem("highScore") || 0;
                    if (this.player.score > highScore) {
                        localStorage.setItem("highScore", this.player.score);
                    }
    
                    if (this.player.score >= this.maxScore) {
                        this.player.isGameOver = true;
                        this.dialogueSystem.triggerDialogue(this);
                        this.reachGoal();
                    }
                }
            });
        });
    
        this.enemy.enemyProjectiles.forEach((proj, epIndex) => {
            const projWidth = proj.width || this.canvas.width * 0.01;
            const projHeight = proj.height || this.canvas.width * 0.01;
    
            if (
                proj.x < this.player.x + this.player.width &&
                proj.x + projWidth > this.player.x &&
                proj.y < this.player.y + this.player.height &&
                proj.y + projHeight > this.player.y
            ) {
                this.enemy.enemyProjectiles.splice(epIndex, 1);
                this.player.health = Math.max(0, this.player.health - 2);
    
                if (this.player.health <= 0) {
                    this.dialogueSystem.triggerDialogue(this);

                   this.playerDeath();
                }
            }
        });
    }
    

   
    // Handle reaching the goal
    reachGoal() {
        console.log("Player has reached the goal!");
        clearInterval(this.enemy.enemySpawner); // Stop enemy spawning
        // Get high score
        let highScore = localStorage.getItem("highScore") || 0;
        let newHighScore = false;

        // Check if new high score is reached
        if (this.player.score == highScore) {
            localStorage.setItem("highScore", this.player.score);
            newHighScore = true;
        }
        this.done = true; // Stop game loop

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


     // Handle player death
     playerDeath() {
        console.log("Player has died!");
        
        this.player.health = 0; // Ensure health does not go below 0
        
        clearInterval(this.enemy.enemySpawner); // Stop enemy spawning

        // Make player "fall down"
        this.player.y += this.player.height * 0.9;
        this.player.height = this.player.height / 10;

        // Display game over screen
        this.showGameOverScreen();
        this.done = true;
    }

    update() {
        if (this.isPaused) {
            return; // Skip update logic when the game is paused
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.drawBackground();
        this.background.moveObjects(this);
        this.player.updatePlayer(this.keys);
        this.player.drawPlayer(this.keys);
        this.player.drawProjectiles();
        this.enemy.drawEnemies(this.keys, this.player);
        this.enemy.drawEnemyProjectiles(this.keys, this.player);
        this.checkCollisions();
        this.player.drawHealthBar();
        this.updateHUD();

        this.dialogueSystem.triggerDialogue(this);
        this.enemy.spawnEnemies(this.distanceTraveled);
        this.isPaused = this.dialogueSystem.isPaused;
    }

    // Handle key press
    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.dialogueSystem.showDialogLine();
            this.isPaused = this.dialogueSystem.isPaused;
        }
    
        if (this.player.health > 0) {
            if (event.key === "d") {
                this.keys.d = true;
                this.player.facingRight = true;
            }
            if (event.key === "a") {
                this.keys.a = true;
                this.player.facingRight = false;
            }
            if (event.code === "Space" && !this.player.isJumping) {
                // 空格键跳跃
                this.player.isJumping = true;
                this.player.velocityY = -this.canvas.height * 0.02;
            }
            if (event.key === "j" && !this.player.isAttacking) {
                // J键近战攻击
                this.keys.j = true;
                this.player.isAttacking = true;
    
                this.player.swordAttack(); // 直接近战
    
                setTimeout(() => { 
                    this.player.isAttacking = false; 
                }, 400);
            }
            if (event.key === "k" && !this.player.isAttacking) {
                // K键魔法攻击
                this.keys.k = true;
                this.player.isAttacking = true;
    
                // 随机释放一个魔法技能
                const magicSkills = [
                    this.player.castFireBall.bind(this.player),
                    this.player.castWaterBall.bind(this.player),
                    this.player.castMagicBall.bind(this.player),
                    this.player.castBigLightBall.bind(this.player),
                ];
    
                const randomMagic = magicSkills[Math.floor(Math.random() * magicSkills.length)];
                randomMagic();
    
                setTimeout(() => { 
                    this.player.isAttacking = false; 
                }, 400);
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