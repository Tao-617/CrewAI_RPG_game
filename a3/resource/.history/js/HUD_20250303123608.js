export class HUD {
    constructor(canvas, player) {
        this.canvas = canvas;
        this.player = player;
    }

    update() {
        let hud = document.getElementById("hud");
        hud.innerHTML = `Health: ${this.player.health} | Score: ${this.player.score}`;
    }
}
