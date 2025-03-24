export class Drawer {
    constructor(canvas, back) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // Precalculate static background elements
        this.staticElements = this.generateStaticElements();
    }

    // Existing methods...

    // New scene rendering functions

    drawVerdantHeartlands() {
        // Sky gradient
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height * 0.6);
        skyGradient.addColorStop(0, "#87CEEB");
        skyGradient.addColorStop(1, "#E6F3FF");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);

        // Rolling hills
        this.drawHills(4, 0.5, 0.9, ["#228B22", "#32CD32", "#90EE90"]);

        // Tree of Ages
        this.drawTreeOfAges(this.canvas.width * 0.7, this.canvas.height * 0.4);

        // Wildflowers
        this.drawWildflowers(50);

        // River
        this.drawRiver(0, this.canvas.height * 0.7, this.canvas.width, this.canvas.height * 0.1);

        // Distant mountains
        this.drawMountains(3, 0.2, 0.4, "#4682B4");
    }

    drawTempleEternalDawn() {
        // Radiant sky gradient
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#FF7F50");
        skyGradient.addColorStop(0.3, "#FFA07A");
        skyGradient.addColorStop(0.7, "#87CEFA");
        skyGradient.addColorStop(1, "#F0F8FF");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Temple structure
        this.drawTemple(this.canvas.width * 0.5, this.canvas.height * 0.4);

        // Light orbs
        this.drawLightOrbs(20);

        // Shimmering pools
        this.drawShimmeringPools(3);

        // Golden statues
        this.drawGoldenStatues(5);
    }

    drawThunderpeakMountains() {
        // Stormy sky gradient
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#2F4F4F");
        skyGradient.addColorStop(0.5, "#708090");
        skyGradient.addColorStop(1, "#A9A9A9");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Jagged mountain peaks
        this.drawJaggedMountains(5, 0.3, 1);

        // Lightning (random)
        if (Math.random() < 0.1) {
            this.drawLightning();
        }

        // Floating islands
        this.drawFloatingIslands(3);

        // Storm clouds
        this.drawStormClouds();
    }

    drawEarthheartForge() {
        // Underground forge gradient
        const caveGradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.5, this.canvas.height * 0.5, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.5, this.canvas.width * 0.7
        );
        caveGradient.addColorStop(0, "#8B4513");
        caveGradient.addColorStop(1, "#3D2315");
        this.ctx.fillStyle = caveGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Glowing forge
        this.drawForge(this.canvas.width * 0.5, this.canvas.height * 0.6);

        // Crystal formations
        this.drawCrystals(15);

        // Lava streams
        this.drawLavaStreams(3);

        // Ancient runes
        this.drawAncientRunes();
    }

    drawWhisperingWoods() {
        // Misty, shadowy forest background
        this.ctx.fillStyle = "#1A2421";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Silhouette trees
        this.drawSilhouetteTrees(20);

        // Glowing mushrooms
        this.drawGlowingMushrooms(30);

        // Mist wisps
        this.drawMistWisps();

        // Eerie eyes
        this.drawEerieEyes(10);
    }

    drawNightmareSpire() {
        // Dark, swirling void gradient
        const voidGradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.5, this.canvas.height * 0.5, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.5, this.canvas.width
        );
        voidGradient.addColorStop(0, "#120424");
        voidGradient.addColorStop(1, "#000000");
        this.ctx.fillStyle = voidGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Nightmare Spire structure
        this.drawNightmareSpire(this.canvas.width * 0.5, this.canvas.height * 0.3);

        // Void tentacles
        this.drawVoidTentacles(8);

        // Corrupted crystals
        this.drawCorruptedCrystals(12);

        // Swirling void energy
        this.drawSwirlingShadows();
    }

    drawRestoredGoldenCity() {
        // Brilliant golden sky gradient
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGradient.addColorStop(0, "#FFD700");
        skyGradient.addColorStop(0.6, "#FFA500");
        skyGradient.addColorStop(1, "#F0E68C");
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Golden buildings
        this.drawGoldenBuildings();

        // Shimmering fountains
        this.drawShimmeringFountains(3);

        // Radiant light beams
        this.drawLightBeams();

        // Fireworks
        this.drawFireworks(5);
    }

    drawAbyssalRift() {
        // Deep, dark void background
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Swirling chaos energies
        this.drawChaosEnergies();

        // Floating debris
        this.drawFloatingDebris(20);

        // Void creatures
        this.drawVoidCreatures(5);

        // Reality tears
        this.drawRealityTears(3);
    }

    // Helper methods for scene elements

    drawTreeOfAges(x, y) {
        this.ctx.fillStyle = "#4B3621";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - 40, y + 200);
        this.ctx.lineTo(x + 40, y + 200);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#228B22";
        this.ctx.beginPath();
        this.ctx.arc(x, y - 50, 100, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawWildflowers(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.3;
            const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawRiver(x, y, width, height) {
        const riverGradient = this.ctx.createLinearGradient(x, y, x, y + height);
        riverGradient.addColorStop(0, "#4169E1");
        riverGradient.addColorStop(1, "#000080");
        this.ctx.fillStyle = riverGradient;
        this.ctx.fillRect(x, y, width, height);
    }

    drawTemple(x, y) {
        this.ctx.fillStyle = "#F5DEB3";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - 100, y + 200);
        this.ctx.lineTo(x + 100, y + 200);
        this.ctx.closePath();
        this.ctx.fill();

        // Columns
        this.ctx.fillRect(x - 80, y + 50, 20, 150);
        this.ctx.fillRect(x + 60, y + 50, 20, 150);
    }

    drawLightOrbs(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const radius = 5 + Math.random() * 10;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, "rgba(255, 255, 200, 1)");
            gradient.addColorStop(1, "rgba(255, 255, 200, 0)");
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawShimmeringPools(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height * 0.7 + Math.random() * this.canvas.height * 0.2;
            const radius = 30 + Math.random() * 50;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, "rgba(135, 206, 250, 0.8)");
            gradient.addColorStop(1, "rgba(135, 206, 250, 0.2)");
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, radius, radius * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawGoldenStatues(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.3;
            this.ctx.fillStyle = "#FFD700";
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - 10, y + 40);
            this.ctx.lineTo(x + 10, y + 40);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(x, y - 10, 8, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawJaggedMountains(count, minHeight, maxHeight) {
        this.ctx.fillStyle = "#4B4B4B";
        for (let i = 0; i < count; i++) {
            const x = (i / count) * this.canvas.width;
            const height = this.canvas.height * (minHeight + Math.random() * (maxHeight - minHeight));
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.canvas.height);
            this.ctx.lineTo(x + 50, this.canvas.height - height);
            this.ctx.lineTo(x + 100, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    drawStormClouds() {
        this.ctx.fillStyle = "rgba(105, 105, 105, 0.7)";
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.5;
            const radius = 50 + Math.random() * 100;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawForge(x, y) {
        this.ctx.fillStyle = "#8B4513";
        this.ctx.fillRect(x - 50, y, 100, 100);
        const gradient = this.ctx.createRadialGradient(x, y + 50, 0, x, y + 50, 50);
        gradient.addColorStop(0, "rgba(255, 69, 0, 1)");
        gradient.addColorStop(1, "rgba(255, 69, 0, 0)");
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y + 50, 50, 0, Math.PI, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawCrystals(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = 10 + Math.random() * 30;
            this.ctx.fillStyle = "rgba(173, 216, 230, 0.7)";
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - size);
            this.ctx.lineTo(x + size / 2, y);
            this.ctx.lineTo(x