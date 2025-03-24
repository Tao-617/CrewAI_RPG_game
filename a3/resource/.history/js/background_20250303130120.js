export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.state = "day";

        
        this.grassPatches = this.generateGrass();
        this.clouds = this.generateClouds();
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

    // Generate grass patches
    generateGrass() {
        let patches = [];
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * this.canvas.width;
            let y = this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.4;
            patches.push({ x, y });
        }
        return patches;
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

    
   // Generate cloud data
    generateClouds() {
        let patches = [];
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height * 0.5;
            let width = Math.random() * this.canvas.width * 0.1;
            let height = width * 0.5;
            patches.push({ x, y, width, height });
        }
        return patches;
    }

    draw(ctx) {
        ctx.fillStyle = this.state === "day" ? "#87CEEB" : "#191970";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
