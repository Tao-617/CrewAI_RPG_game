import { Drawer } from "./drawer.js";
export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
   
        this.backgroundState = "verdantHeartlands"; // Initial background: daytime
        this.drawer = new Drawer(canvas, this);
        
    }

    
    // Switch background based on scene
    switchBackground(scene) {
        switch(scene) {
            case "verdantHeartlands":
                this.backgroundState = "verdantHeartlands";
                this.drawBackground();
                break;
            case "templeEternalDawn":
                this.backgroundState = "templeEternalDawn";
                this.drawBackground();
                break;
            case "thunderpeakMountains":
                this.backgroundState = "thunderpeakMountains";
                this.drawBackground();
                break;
            case "earthheartForge":
                this.backgroundState = "earthheartForge";
                this.drawBackground();
                break;
            case "whisperingWoods":
                this.backgroundState = "whisperingWoods";
                this.drawBackground();
                break;
            case "nightmareSpire":
                this.backgroundState = "nightmareSpire";
                this.drawBackground();
                break;
            case "restoredGoldenCity":
                this.backgroundState = "restoredGoldenCity";
                this.drawBackground();
                break;
            case "win":
                this.backgroundState = "restoredGoldenCity";
                this.drawBackground();
                break;
            case "lose":
                this.backgroundState = "abyssalRift";
                this.drawBackground();
                break;
            default:
                this.backgroundState = "verdantHeartlands";
        }
    }

    // Draw background based on state
    drawBackground() {
        switch(this.backgroundState) {
            case "verdantHeartlands":
                this.drawVerdantHeartlands();
                break;
            case "templeEternalDawn":
                this.drawTempleEternalDawn();
                break;
            case "thunderpeakMountains":
                this.drawThunderpeakMountains();
                break;
            case "earthheartForge":
                this.drawEarthheartForge();
                break;
            case "whisperingWoods":
                this.drawWhisperingWoods();
                break;
            case "nightmareSpire":
                this.drawNightmareSpire();
                break;
            case "restoredGoldenCity":
                this.drawRestoredGoldenCity();
                break;
            case "abyssalRift":
                this.drawAbyssalRift();
                break;
        }

        // Common elements
        if (this.backgroundState !== "nightmareSpire" && this.backgroundState !== "abyssalRift") {
            this.drawer.staticElements.clouds.forEach(cloud => this.drawer.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height));
        }
    }
   

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

    }


    drawVerdantHeartlands() {
        // Lush, vibrant landscape with the Tree of Ages as a focal point
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height * 0.6);
        skyGradient.addColorStop(0, "#87CEEB");
        skyGradient.addColorStop(1, "#E6F3FF");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);

        // Rolling hills with varied shades of green
        this.drawer.drawHills(4, 0.5, 0.9, ["#228B22", "#32CD32", "#90EE90"]);

        // Tree of Ages (large, ancient-looking tree)
        this.drawer.drawTreeOfAges(this.canvas.width * 0.7, this.canvas.height * 0.4);

        // Scattered wildflowers
        this.drawer.drawWildflowers(50);

        // Flowing river
        this.drawer.drawRiver(0, this.canvas.height * 0.7, this.canvas.width, this.canvas.height * 0.1);

        // Distant mountains
        this.drawer.drawMountains(3, 0.2, 0.4, "#4682B4");
    }

    drawTempleEternalDawn() {
        // Radiant sky with eternal sunrise
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#FF7F50");
        skyGradient.addColorStop(0.3, "#FFA07A");
        skyGradient.addColorStop(0.7, "#87CEFA");
        skyGradient.addColorStop(1, "#F0F8FF");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Majestic temple structure
        this.drawer.drawTemple(this.canvas.width * 0.5, this.canvas.height * 0.4);

        // Floating light orbs
        this.drawer.drawLightOrbs(20);

        // Shimmering pools of water
        this.drawer.drawShimmeringPools(3);

        // Golden statues
        this.drawer.drawGoldenStatues(5);
    }

    drawThunderpeakMountains() {
        // Stormy sky with dark clouds
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#2F4F4F");
        skyGradient.addColorStop(0.5, "#708090");
        skyGradient.addColorStop(1, "#A9A9A9");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Jagged mountain peaks
        this.drawer.drawJaggedMountains(5, 0.3, 1);

        // Lightning strikes (random)
        if (Math.random() < 0.1) {
            this.drawer.drawLightning();
        }

        // Floating islands
        this.drawer.drawFloatingIslands(3);

        // Swirling storm clouds
        this.drawer.drawStormClouds();
    }

    drawEarthheartForge() {
        // Warm, earthy tones for the underground forge
        const caveGradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.5, this.canvas.height * 0.5, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.5, this.canvas.width * 0.7
        );
        caveGradient.addColorStop(0, "#8B4513");
        caveGradient.addColorStop(1, "#3D2315");
        this.ctx.fillStyle = caveGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Glowing forge
        this.drawer.drawForge(this.canvas.width * 0.5, this.canvas.height * 0.6);

        // Crystal formations
        this.drawer.drawDarkCrystals(15);

        // Flowing lava streams
        this.drawer.drawLavaStreams(3);

        // Ancient runes on walls
        this.drawer.drawAncientRunes();
    }

    drawWhisperingWoods() {
        // Misty, shadowy forest
        this.ctx.fillStyle = "#1A2421";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Silhouette trees
        this.drawer.drawSilhouetteTrees(20);

        // Glowing mushrooms
        this.drawer.drawGlowingMushrooms(30);

        // Wisps of mist
        this.drawer.drawMistWisps();

        // Eerie eyes in the darkness
        this.drawer.drawEerieEyes(10);
    }

    drawNightmareSpire() {
        // Dark, swirling void
        const voidGradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.5, this.canvas.height * 0.5, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.5, this.canvas.width
        );
        voidGradient.addColorStop(0, "#120424");
        voidGradient.addColorStop(1, "#000000");
        this.ctx.fillStyle = voidGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Nightmare Spire structure
        this.drawer.drawNightmareSpire(this.canvas.width * 0.5, this.canvas.height * 0.3);

        // Void tentacles
        this.drawer.drawVoidTentacles(8);

        // Corrupted crystals
        this.drawer.drawCorruptedCrystals(12);

        // Swirling void energy
        this.drawer.drawSwirlingShadows();
    }

    drawRestoredGoldenCity() {
        // Brilliant golden sky
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#FFD700");
        skyGradient.addColorStop(0.6, "#FFA500");
        skyGradient.addColorStop(1, "#F0E68C");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Majestic golden buildings
        this.drawer.drawGoldenBuildings();

        // Shimmering fountains
        this.drawer.drawShimmeringFountains(3);

        // Radiant light beams
        this.drawer.drawLightBeams();

        // Celebratory fireworks
        this.drawer.drawFireworks(5);
    }

    drawAbyssalRift() {
        // Deep, dark void
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Swirling chaos energies
        this.drawer.drawChaosEnergies();

        // Floating debris of reality
        this.drawer.drawFloatingDebris(20);

        // Void creatures
        this.drawer.drawVoidCreatures(5);

        // Tears in reality
        this.drawer.drawRealityTears(3);
    }
}

