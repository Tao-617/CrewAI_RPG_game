Here's the updated `logic.js` file with the new gameplay logic implemented:

```javascript
import { Player } from "./player.js";
import { EnemyManager } from "./enemy.js";
import { DialogueSystem } from "./dialogCtrl.js"
import { Background } from "./background.js";
import { HUD } from "./HUD.js";

// New class for Villagers
class Villager extends GameEntity {
    constructor(x, y, canvas) {
        super(x, y, canvas.width * 0.05, canvas.height * 0.1);
        this.canvas = canvas;
        this.speed = canvas.width * 0.002;
    }

    moveToSafeZone(safeZones) {
        const nearestSafeZone = safeZones.reduce((nearest, zone) => {
            const distance = Math.sqrt(Math.pow(this.x - zone.x, 2) + Math.pow(this.y - zone.y, 2));
            return distance < nearest.distance ? { zone, distance } : nearest;
        }, { zone: null, distance: Infinity }).zone;

        if (nearestSafeZone) {
            const dx = nearestSafeZone.x - this.x;
            const dy = nearestSafeZone.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > this.speed) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class GameLogic {
    constructor() {
        // ... (existing constructor code) ...

        this.villagers = [];
        this.safeZones = [
            { x: this.canvas.width * 0.1, y: this.canvas.height * 0.9, width: this.canvas.width * 0.1, height: this.canvas.height * 0.1 },
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.9, width: this.canvas.width * 0.1, height: this.canvas.height * 0.1 }
        ];
        this.currentScene = 'AttackOnOakvale';
        this.runesPuzzleSolved = false;
    }

    spawnVillagers() {
        for (let i = 0; i < 5; i++) {
            this.villagers.push(new Villager(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height * 0.7,
                this.canvas
            ));
        }
    }

    updateVillagers() {
        this.villagers.forEach(villager => {
            villager.moveToSafeZone(this.safeZones);
            villager.draw(this.ctx);
        });
    }

    telepathy() {
        this.enemy.enemies.forEach(enemy => {
            if (this.player.distanceTo(enemy) < this.canvas.width * 0.1) {
                enemy.confused = true;
                setTimeout(() => enemy.confused = false, 3000);
            }
        });
    }

    activateRune(x, y) {
        let rune = this.background.interactiveObjects.find(obj => 
            obj.type === 'rune' && 
            Math.abs(obj.position.x - x) < this.canvas.width * 0.05 && 
            Math.abs(obj.position.y - y) < this.canvas.height * 0.05
        );
        if (rune && !rune.activate