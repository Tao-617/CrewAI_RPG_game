export class HUD {
    constructor(canvas, player) {
        this.canvas = canvas;
        this.player = player;
    }

    
    updateHUD() {
        const hud = document.getElementById("hud");
        hud.innerHTML = `
            <div>Health: ${this.player.health}%</div>
            <div>Score: ${this.player.score}</div>
            <div>Distance: ${Math.round(this.distanceTraveled)} / ${this.maxDistance}</div>
            <div>High Score: ${localStorage.getItem("highScore") || 0}</div>
        `;
    }
}
