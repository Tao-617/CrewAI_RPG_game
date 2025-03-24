import { Drawer } from "./drawer.js";
export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
   
        this.backgroundState = "intro"; // Initial background: daytime
        this.drawer = new Drawer(canvas, this);
        
    }

    // Switch background based on scene
    switchBackground(scene) {
        switch(scene) {
            case "intro":
                this.backgroundState = "verdantPlains";
                break;
            case "meetAria":
                this.backgroundState = "mistyMountains";
                break;
            case "encounterZephyr":
                this.backgroundState = "sunkenIsles";
                break;
            case "win":
                this.backgroundState = "scorchedWastes";
                break;
            case "lose":
                this.backgroundState = "shadowRealm";
                break;
            case "midBattle":
                this.backgroundState = "nightBattle";
                break;
            case "finalBattle":
                this.backgroundState = "darkLordFortress";
                break;
            default:
                this.backgroundState = "verdantPlains";
        }
    }

    // Draw background based on state
    drawBackground() {
        switch(this.backgroundState) {
            case "verdantPlains":
                this.drawVerdantPlains();
                break;
            case "mistyMountains":
                this.drawMistyMountains();
                break;
            case "sunkenIsles":
                this.drawSunkenIsles();
                break;
            case "scorchedWastes":
                this.drawScorchedWastes();
                break;
            case "shadowRealm":
                this.drawShadowRealm();
                break;
            case "nightBattle":
                this.drawNightBattle();
                break;
            case "darkLordFortress":
                this.drawDarkLordFortress();
                break;
        }

        // Common elements
        if (this.backgroundState !== "sunkenIsles" && this.backgroundState !== "shadowRealm") {
            this.drawer.staticElements.clouds.forEach(cloud => this.drawer.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height));
        }
        if (this.backgroundState === "verdantPlains" || this.backgroundState === "mistyMountains") {
            this.drawer.staticElements.grassPatches.forEach(grass => this.drawer.drawGrass(grass.x, grass.y));
        }
    }
    // // Draw background based on state
    // drawBackground() {
    //     if (this.backgroundState === "day") {
    //         this.ctx.fillStyle = "#87CEEB"; // Sky blue
    //         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
    //         this.ctx.fillStyle = "#90EE90"; // Green grass
    //         this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
    //         this.drawSun(this.canvas.width * 0.8, this.canvas.height * 0.1, this.canvas.width * 0.05);
    //     } 
    //     else if (this.backgroundState === "sunset") {
    //         this.ctx.fillStyle = "#FF8C00"; // Orange sunset
    //         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
    //         this.ctx.fillStyle = "#556B2F"; // Dark green grass
    //         this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
    //     } 
    //     else if (this.backgroundState === "storm") {
    //         // 1% chance to trigger lightning
    //         const isLightningStrike = Math.random() < 0.01;

    //         if (isLightningStrike) {
    //             this.drawLightning(); // Add lightning effect
    //             this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; // Momentary white flash
    //             this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //             setTimeout(() => {
    //                 this.redrawStormBackground(); // Restore background after short flash
    //             }, 100);
    //         } else {
    //             this.redrawStormBackground();
    //         }
    //     } 
    //     else if (this.backgroundState === "night") {
    //         this.ctx.fillStyle = "#191970"; // Dark blue night sky
    //         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
    //         this.ctx.fillStyle = "#2E8B57"; // Dark green grass
    //         this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
    //         this.drawMoon();
    //     }

    //     this.clouds.forEach(cloud => this.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height));
    //     this.grassPatches.forEach(grass => this.drawGrass(grass.x, grass.y));
    // }

    // Control movement of grass, clouds, and trees
    moveObjects(logic) {
        if (logic.keys.d && logic.player.x >= (logic.canvas.width * 1 / 3)) {
            logic.player.x = logic.canvas.width * 1 / 3;

            // Increase distance traveled when moving right
            logic.distanceTraveled += logic.player.speed;

            // Move grass patches
            this.drawer.staticElements.grassPatches.forEach(grass => {
                grass.x -= logic.player.speed;
                if (grass.x < -logic.canvas.width * 0.1) {
                    grass.x = logic.canvas.width + Math.random() * 50;
                    grass.y = logic.canvas.height * 0.6 + Math.random() * logic.canvas.height * 0.4;
                }
            });

            // Move clouds
            this.drawer.staticElements.clouds.forEach(cloud => {
                cloud.x -= logic.player.speed * 0.5;
                if (cloud.x < -logic.canvas.width * 0.1) {
                    cloud.x = logic.canvas.width + Math.random() * logic.canvas.width * 0.05 + logic.canvas.width * 0.1;
                    cloud.y = Math.random() * logic.canvas.height * 0.3;
                }
            });

            // Move trees 🌲
            this.drawer.staticElements.trees.forEach(tree => {
                tree.x -= logic.player.speed * 0.7; // Trees move slightly slower than grass for parallax effect
                if (tree.x < -logic.canvas.width * 0.1) {
                    tree.x = logic.canvas.width + Math.random() * logic.canvas.width * 0.1;
                    tree.y = logic.canvas.height * (0.55 + Math.random() * 0.1);
                }
            });

        } else if (logic.keys.d) {
            logic.player.x += logic.player.speed;
        } else if (logic.keys.a && logic.player.x > 0) {
            logic.player.x -= logic.player.speed;
        }

        // If distance reaches 10000, the game ends
        if (logic.player.score >= logic.maxScore) {
            logic.reachGoal();
        }
    }


    drawVerdantPlains() {
        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height * 0.6);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#E6F3FF");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);

        // Rolling hills
        this.ctx.fillStyle = "#90EE90";
        this.drawer.drawHills(3, 0.6, 0.8);

        // Sun
        this.drawer.drawSun(this.canvas.width * 0.8, this.canvas.height * 0.1, this.canvas.width * 0.05);

        // Distant trees
        this.drawer.drawTrees(10, 0.55, 0.65);

    }

    drawMistyMountains() {
        // Misty sky
        this.ctx.fillStyle = "#E6E6FA";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Distant mountains
        this.drawer.drawMountains(5, 0.3, 0.7, "#8B8B8B");

        // Closer mountains
        this.drawer.drawMountains(3, 0.5, 0.9, "#6B8E23");

        // Mist effect
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Snow-capped peaks
        this.drawer.drawSnowCaps();
    }

    drawSunkenIsles() {
        // Underwater effect
        this.ctx.fillStyle = "#4682B4";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Sunken ruins
        this.drawer.drawRuins();

        // Floating islands
        this.drawer.drawFloatingIslands();

        // Underwater plants
        this.drawer.drawUnderwaterPlants();

        // Bubbles
        this.drawer.drawBubbles(30);
    }

    drawScorchedWastes() {
        // Desert sky
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, "#FF8C00");
        gradient.addColorStop(0.6, "#FFD700");
        gradient.addColorStop(1, "#F4A460");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Sand dunes
        this.drawer.drawSandDunes();

        // Mirages
        this.drawer.drawMirages();

        // Cactus
        this.drawer.drawCactus(5);
    }

    // Shadow Realm Scene Functions
    drawShadowRealm() {
        // Dark, swirling sky
        this.ctx.fillStyle = "#1A1A1A";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw the moon for shadow realm (dark version)
        this.drawer.drawDarkMoon();
        
        // Swirling darkness
        this.drawer.drawSwirlingShadows();
        
        // Floating dark crystals
        this.drawer.drawDarkCrystals();
        
        // Eerie glow
        this.drawer.drawEerieGlow();
        
        // Shadow creatures
        this.drawer.drawShadowCreatures();
    }

    // Night Battle Scene Functions
    drawNightBattle() {
        // Night sky
        this.ctx.fillStyle = "#191970";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Stars
        this.drawer.drawStars();
        
        // Moon
        this.drawer.drawMoon();
        
        // Silhouette landscape
        this.drawer.drawSilhouetteLandscape();
        
        // Battle effects (sparkles, etc.)
        this.drawer.drawBattleEffects();
    }

    drawDarkLordFortress() {
        // Stormy sky
        this.drawer.drawStormySky();

        // Dark fortress
        this.drawer.drawFortress();

        // Lightning
        if (Math.random() < 0.05) {
            this.drawer.drawLightning();
        }

        // Swirling dark energy
        this.drawer.drawDarkEnergy();
    }

}