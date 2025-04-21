Here's the updated content for `a4/js/logic.js`:

```javascript
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
        this.maxScore = 20; // Set the maximum distance; the game ends when reached

        // New scene-specific variables
        this.currentScene = "AshfallVillage";
        this.dragonBreathActive = false;
        this.villagers = [];
        this.fogAreas = [];
        this.seers = [];
        this.machinery = [];
        this.steamVents = [];
    }
        
    updateHUD() {
        const hud = document.getElementById("hud");
        hud.innerHTML = `
            <div>Health: ${this.player.health}%</div>
            <div>Score: ${this.player.score}</div>
            <div>Distance: ${Math.round(this.distanceTraveled)}</div>
            <div>High Score: ${localStorage.getItem("highScore") || 0}</div>
            <div>Current Scene: ${this.currentScene}</div>
        `;
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
                    enemy.health--;
                    if(enemy.health == 0)
                        this.enemy.enemies.splice(eIndex, 1);
                    this.player.projectiles.splice(pIndex, 1);
                    // Increase health
                    this.player.health = Math.min(100, this.player.health + 5);
                    this.player.score += 1;

                    // Update high score
                    let highScore = localStorage.getItem("highScore") || 0;
                    if (this.player.score > highScore) 
                        localStorage.setItem("highScore", this.player.score);

                    // If distance reaches 10000, the game ends
                    if (this.player.score >= this.maxScore) {
                        this.player.isGameOver = true;
                        this.dialogueSystem.triggerDialogue(this