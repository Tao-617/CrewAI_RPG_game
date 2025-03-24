export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.state = "day";
    }

    // Switch background based on scene
    switchBackground(scene) {
        if (scene === "intro") {
            this.backgroundState = "sunset";
        } else if (scene === "midBattle") {
            this.backgroundState = "night";
        } else if (scene === "finalBattle") {
            this.backgroundState = "storm";
        } else {
            this.backgroundState = "day"; // Default: daytime
        }
    }
    // Draw background based on state
    drawBackground() {
        if (this.backgroundState === "day") {
            this.ctx.fillStyle = "#87CEEB"; // Sky blue
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
            this.ctx.fillStyle = "#90EE90"; // Green grass
            this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
            this.drawSun(this.canvas.width * 0.8, this.canvas.height * 0.1, this.canvas.width * 0.05);
        } 
        else if (this.backgroundState === "sunset") {
            this.ctx.fillStyle = "#FF8C00"; // Orange sunset
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
            this.ctx.fillStyle = "#556B2F"; // Dark green grass
            this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
        } 
        else if (this.backgroundState === "storm") {
            // 1% chance to trigger lightning
            const isLightningStrike = Math.random() < 0.01;

            if (isLightningStrike) {
                this.drawLightning(); // Add lightning effect
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; // Momentary white flash
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                setTimeout(() => {
                    this.redrawStormBackground(); // Restore background after short flash
                }, 100);
            } else {
                this.redrawStormBackground();
            }
        } 
        else if (this.backgroundState === "night") {
            this.ctx.fillStyle = "#191970"; // Dark blue night sky
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
            this.ctx.fillStyle = "#2E8B57"; // Dark green grass
            this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
            this.drawMoon();
        }

        this.clouds.forEach(cloud => this.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height));
        this.grassPatches.forEach(grass => this.drawGrass(grass.x, grass.y));
    }

    // Redraw storm background
    redrawStormBackground() {
        this.ctx.fillStyle = "#2F4F4F"; // Dark gray storm sky
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
        this.ctx.fillStyle = "#6B8E23"; // Dark green grass
        this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
        this.drawRain();
    }

    draw(ctx) {
        ctx.fillStyle = this.state === "day" ? "#87CEEB" : "#191970";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
