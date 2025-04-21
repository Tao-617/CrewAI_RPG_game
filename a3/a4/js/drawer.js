export class Drawer {
    constructor(canvas, back) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
         // 预计算静态背景元素
         this.staticElements = this.generateStaticElements(); // 预生成静态背景
    }
    // ** 预生成所有静态背景元素（只执行一次）**
    generateStaticElements() {
        return {
            grassPatches : this.generateGrass(),
            silhouetteLandscape: this.generateSilhouetteLandscape(),
            clouds : this.generateClouds(),
            trees : this.generateTrees(10, 0.55, 0.65),
            hills: this.generateHills(3, 0.6, 0.8),
            mountains: this.generateMountains(5, 0.3, 0.7, "#8B8B8B"),
            snowCaps: this.generateSnowCaps(5),
            ruins: this.generateRuins(3),
            floatingIslands: this.generateFloatingIslands(5),
            sandDunes: this.generateSandDunes(3),
            battleEffects: this.generateBattleEffects(40),
            shadowCreatures: this.generateShadowCreatures(8),
            stars: this.generateStars(200),
            swirlingShadows: this.generateSwirlingShadows(5),
            darkCrystals: this.generateDarkCrystals(12),
            cactus: this.generateCactus(5),
            underwaterPlants: this.generateUnderwaterPlants(20),
        };
    }
    // Helper drawing methods
 // 绘制旋转的混沌能量
 drawChaosEnergies() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const maxRadius = this.canvas.width * 0.3;
    const energyColors = ["rgba(138, 43, 226, 0.3)", "rgba(75, 0, 130, 0.4)", "rgba(255, 20, 147, 0.3)"];

    for (let i = 0; i < 5; i++) {
        let radius = maxRadius * (0.5 + Math.random() * 0.5);
        let angleOffset = Math.random() * Math.PI * 2;

        this.ctx.beginPath();
        for (let j = 0; j < Math.PI * 2; j += Math.PI / 16) {
            let angle = j + angleOffset;
            let x = centerX + Math.cos(angle) * radius;
            let y = centerY + Math.sin(angle) * radius;
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();

        this.ctx.fillStyle = energyColors[i % energyColors.length];
        this.ctx.fill();
    }
}

// 绘制漂浮在虚空中的破碎残骸
drawFloatingDebris(count) {
    for (let i = 0; i < count; i++) {
        let x = Math.random() * this.canvas.width;
        let y = Math.random() * this.canvas.height;
        let width = 20 + Math.random() * 40;
        let height = 10 + Math.random() * 30;

        this.ctx.fillStyle = "#2F4F4F";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y - height);
        this.ctx.lineTo(x + width * 0.8, y + height * 0.5);
        this.ctx.lineTo(x - width * 0.2, y + height * 0.3);
        this.ctx.closePath();
        this.ctx.fill();

        // 破碎边缘效果
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}

// 绘制虚空生物
drawVoidCreatures(count) {
    for (let i = 0; i < count; i++) {
        let x = Math.random() * this.canvas.width;
        let y = this.canvas.height * (0.6 + Math.random() * 0.3);
        let size = 30 + Math.random() * 20;

        // 主要躯体（黑色虚影）
        this.ctx.fillStyle = "rgba(20, 20, 20, 0.8)";
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();

        // 眼睛
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        this.ctx.beginPath();
        this.ctx.arc(x - size * 0.2, y - size * 0.2, size * 0.1, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.2, y - size * 0.2, size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();

        // 触手
        this.ctx.strokeStyle = "rgba(40, 40, 40, 0.7)";
        this.ctx.lineWidth = 3;
        for (let j = 0; j < 3; j++) {
            let tentacleX = x + (Math.random() - 0.5) * size;
            let tentacleY = y + Math.random() * size;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(tentacleX, tentacleY);
            this.ctx.stroke();
        }
    }
}

// 绘制现实裂隙
drawRealityTears(count) {
    for (let i = 0; i < count; i++) {
        let x = Math.random() * this.canvas.width;
        let y = Math.random() * this.canvas.height * 0.8;
        let tearWidth = 40 + Math.random() * 30;
        let tearHeight = 60 + Math.random() * 50;

        const gradient = this.ctx.createRadialGradient(x, y, 5, x, y, tearHeight);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(138, 43, 226, 0.5)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, tearWidth * 0.5, tearHeight, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
        // 绘制金色建筑
        drawGoldenBuildings() {
            const buildingColors = ["#FFD700", "#FFA500", "#FFEC8B"]; // 金色调
            const buildingWidth = this.canvas.width * 0.1;
            const baseY = this.canvas.height * 0.6;
    
            for (let i = 0; i < 5; i++) {
                let x = this.canvas.width * (0.1 + i * 0.18);
                let height = this.canvas.height * (0.2 + Math.random() * 0.2);
    
                this.ctx.fillStyle = buildingColors[i % buildingColors.length];
                this.ctx.fillRect(x, baseY - height, buildingWidth, height);
    
                // 添加建筑顶部的金色穹顶
                this.ctx.beginPath();
                this.ctx.arc(x + buildingWidth / 2, baseY - height, buildingWidth / 3, 0, Math.PI, true);
                this.ctx.fill();
            }
        }
    
        // 绘制闪烁的喷泉
        drawShimmeringFountains(count) {
            for (let i = 0; i < count; i++) {
                let x = this.canvas.width * (0.2 + i * 0.2);
                let y = this.canvas.height * 0.75;
                let fountainRadius = this.canvas.width * 0.05;
    
                // 水池底座
                this.ctx.fillStyle = "#4682B4";
                this.ctx.beginPath();
                this.ctx.arc(x, y, fountainRadius, 0, Math.PI * 2);
                this.ctx.fill();
    
                // 喷泉水柱
                this.ctx.fillStyle = "rgba(173, 216, 230, 0.7)";
                this.ctx.beginPath();
                this.ctx.ellipse(x, y - fountainRadius * 2, fountainRadius * 0.3, fountainRadius * 1.5, 0, 0, Math.PI * 2);
                this.ctx.fill();
    
                // 水滴效果
                for (let j = 0; j < 6; j++) {
                    let dropletX = x + (Math.random() - 0.5) * fountainRadius;
                    let dropletY = y - fountainRadius * 2 - Math.random() * fountainRadius;
                    this.ctx.fillStyle = "rgba(173, 216, 230, 0.5)";
                    this.ctx.beginPath();
                    this.ctx.arc(dropletX, dropletY, 3, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }
    
        // 绘制辐射光束
        drawLightBeams() {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height * 0.3;
            const beamWidth = this.canvas.width * 0.1;
            const beamHeight = this.canvas.height * 0.5;
            const beamCount = 6;
    
            for (let i = 0; i < beamCount; i++) {
                const angle = (i - beamCount / 2) * 10; // 角度偏移
                this.ctx.save();
                this.ctx.translate(centerX, centerY);
                this.ctx.rotate((Math.PI / 180) * angle);
    
                const gradient = this.ctx.createLinearGradient(0, 0, 0, beamHeight);
                gradient.addColorStop(0, "rgba(255, 255, 200, 0.5)");
                gradient.addColorStop(1, "rgba(255, 255, 150, 0)");
    
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.moveTo(-beamWidth / 2, 0);
                this.ctx.lineTo(beamWidth / 2, 0);
                this.ctx.lineTo(0, beamHeight);
                this.ctx.closePath();
                this.ctx.fill();
    
                this.ctx.restore();
            }
        }
    
        // 绘制庆祝烟花
        drawFireworks(count) {
            for (let i = 0; i < count; i++) {
                let x = Math.random() * this.canvas.width;
                let y = Math.random() * this.canvas.height * 0.4;
                let explosionSize = 10 + Math.random() * 20;
                let color = ["#FF4500", "#FFD700", "#FF69B4", "#00FF00", "#1E90FF"][Math.floor(Math.random() * 5)];
    
                // 绘制爆炸核心
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(x, y, explosionSize / 2, 0, Math.PI * 2);
                this.ctx.fill();
    
                // 绘制烟花爆炸的光线
                for (let j = 0; j < 8; j++) {
                    let angle = (Math.PI / 4) * j;
                    let endX = x + Math.cos(angle) * explosionSize;
                    let endY = y + Math.sin(angle) * explosionSize;
    
                    this.ctx.strokeStyle = color;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(endX, endY);
                    this.ctx.stroke();
                }
            }
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
    
    // ** 预生成山丘数据 **
    generateHills(count, minHeight, maxHeight) {
        let hills = [];
        for (let i = 0; i < count; i++) {
            let height = this.canvas.height * (minHeight + Math.random() * (maxHeight - minHeight));
            let width = this.canvas.width * (1 + Math.random() * 0.5);
            let x = this.canvas.width * (i / count - 0.5);
            hills.push({ x, height, width });
        }
        return hills;
    }

    drawHills() {
        this.ctx.fillStyle = "#90EE90";
        this.staticElements.hills.forEach(hill => {
            this.ctx.beginPath();
            this.ctx.moveTo(hill.x, this.canvas.height);
            this.ctx.quadraticCurveTo(
                hill.x + hill.width / 2, this.canvas.height - hill.height,
                hill.x + hill.width, this.canvas.height
            );
            this.ctx.fill();
        });
    }

    // ** 预生成树木数据 **
    generateTrees(count, minY, maxY) {
        let trees = [];
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = this.canvas.height * (minY + Math.random() * (maxY - minY));
            let height = this.canvas.height * 0.1;
            trees.push({ x, y, height });
        }
        return trees;
    }

    drawTrees() {
        this.ctx.fillStyle = "#228B22";
        this.staticElements.trees.forEach(tree => {
            this.ctx.beginPath();
            this.ctx.moveTo(tree.x, tree.y);
            this.ctx.lineTo(tree.x - tree.height / 2, tree.y + tree.height);
            this.ctx.lineTo(tree.x + tree.height / 2, tree.y + tree.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    // ** 预生成山脉数据 **
    generateMountains(count, minHeight, maxHeight, color) {
        let mountains = [];
        for (let i = 0; i < count; i++) {
            let height = this.canvas.height * (minHeight + Math.random() * (maxHeight - minHeight));
            let width = this.canvas.width * (1 + Math.random() * 0.5);
            let x = this.canvas.width * (i / count - 0.5);
            mountains.push({ x, height, width, color });
        }
        return mountains;
    }

    drawMountains() {
        this.staticElements.mountains.forEach(mountain => {
            this.ctx.fillStyle = mountain.color;
            this.ctx.beginPath();
            this.ctx.moveTo(mountain.x, this.canvas.height);
            this.ctx.lineTo(mountain.x + mountain.width / 2, this.canvas.height - mountain.height);
            this.ctx.lineTo(mountain.x + mountain.width, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    // ** 预生成雪帽数据 **
    generateSnowCaps(count) {
        let snowCaps = [];
        for (let i = 0; i < count; i++) {
            let x = this.canvas.width * (i / count);
            let y = this.canvas.height * (0.3 + Math.random() * 0.2);
            let width = this.canvas.width * 0.1;
            let height = this.canvas.height * 0.05;
            snowCaps.push({ x, y, width, height });
        }
        return snowCaps;
    }

    drawSnowCaps() {
        this.ctx.fillStyle = "#FFFFFF";
        this.staticElements.snowCaps.forEach(cap => {
            this.ctx.beginPath();
            this.ctx.moveTo(cap.x, cap.y);
            this.ctx.quadraticCurveTo(cap.x + cap.width / 2, cap.y - cap.height, cap.x + cap.width, cap.y);
            this.ctx.fill();
        });
    }

    // ** 预生成废墟数据 **
    generateRuins(count) {
        let ruins = [];
        for (let i = 0; i < count; i++) {
            let x = this.canvas.width * (0.2 + i * 0.3);
            let y = this.canvas.height * 0.5;
            let width = this.canvas.width * 0.1;
            let height = this.canvas.height * 0.3;
            ruins.push({ x, y, width, height });
        }
        return ruins;
    }

    drawRuins() {
        this.ctx.fillStyle = "#8B4513";
        this.staticElements.ruins.forEach(ruin => {
            this.ctx.fillRect(ruin.x, ruin.y, ruin.width, ruin.height);
            this.ctx.strokeRect(ruin.x, ruin.y, ruin.width, ruin.height);
        });
    }

    // ** 预生成浮岛数据 **
    generateFloatingIslands(count) {
        let islands = [];
        for (let i = 0; i < count; i++) {
            let x = this.canvas.width * Math.random();
            let y = this.canvas.height * (0.2 + Math.random() * 0.6);
            let radius = this.canvas.width * (0.05 + Math.random() * 0.05);
            islands.push({ x, y, radius });
        }
        return islands;
    }

    drawFloatingIslands() {
        this.ctx.fillStyle = "#8B4513";
        this.staticElements.floatingIslands.forEach(island => {
            this.ctx.beginPath();
            this.ctx.arc(island.x, island.y, island.radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = "#32CD32";
            this.ctx.beginPath();
            this.ctx.arc(island.x, island.y - island.radius * 0.1, island.radius, 0, Math.PI, true);
            this.ctx.fill();
        });
    }



     /*** ✅ 预生成并绘制水下植物 ***/
     generateUnderwaterPlants(count) {
        let plants = [];
        for (let i = 0; i < count; i++) {
            let x = this.canvas.width * Math.random();
            let y = this.canvas.height;
            let height = this.canvas.height * (0.1 + Math.random() * 0.2);
            plants.push({ x, y, height });
        }
        return plants;
    }

    drawUnderwaterPlants() {
        this.staticElements.underwaterPlants.forEach(plant => {
            this.ctx.strokeStyle = "#00FA9A";
            this.ctx.beginPath();
            this.ctx.moveTo(plant.x, plant.y);
            this.ctx.quadraticCurveTo(
                plant.x + Math.sin(plant.x) * 20,
                plant.y - plant.height,
                plant.x, plant.y - plant.height
            );
            this.ctx.stroke();
        });
    }


    drawBubbles(count) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const radius = this.canvas.width * (0.005 + Math.random() * 0.01);
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

     /*** ✅ 预生成并绘制沙丘 ***/
     generateSandDunes(count) {
        let dunes = [];
        for (let i = 0; i < count; i++) {
            let height = this.canvas.height * (0.2 + Math.random() * 0.3);
            let width = this.canvas.width * 1.5;
            let x = this.canvas.width * (i / 3 - 0.25);
            dunes.push({ x, height, width });
        }
        return dunes;
    }

    drawSandDunes() {
        this.staticElements.sandDunes.forEach(dune => {
            this.ctx.fillStyle = "#F4A460";
            this.ctx.beginPath();
            this.ctx.moveTo(dune.x, this.canvas.height);
            this.ctx.quadraticCurveTo(dune.x + dune.width / 2, this.canvas.height - dune.height, dune.x + dune.width, this.canvas.height);
            this.ctx.fill();
        });
    }

    drawMirages() {
        this.ctx.fillStyle = "rgba(135, 206, 235, 0.3)";
        for (let i = 0; i < 3; i++) {
            const x = this.canvas.width * (0.2 + i * 0.3);
            const y = this.canvas.height * 0.7;
            const width = this.canvas.width * 0.1;
            const height = this.canvas.height * 0.05;
            
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

     /*** ✅ 预生成并绘制仙人掌 ***/
     generateCactus(count) {
        let cactus = [];
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = this.canvas.height * (0.7 + Math.random() * 0.2);
            let width = this.canvas.width * 0.02;
            let height = this.canvas.height * 0.15;
            cactus.push({ x, y, width, height });
        }
        return cactus;
    }

    drawCactus() {
        this.staticElements.cactus.forEach(c => {
            this.ctx.fillStyle = "#228B22";
            this.ctx.fillRect(c.x, c.y, c.width, -c.height);
        });
    }


    drawDarkMoon() {
        const moonX = this.canvas.width * 0.8;
        const moonY = this.canvas.height * 0.15;
        const moonRadius = this.canvas.width * 0.04;
    
        // Dark purple moon
        this.ctx.fillStyle = "#4B0082"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        this.ctx.fill();
    
        // Use destination-out to create crescent shape
        this.ctx.globalCompositeOperation = "destination-out"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
    
        // Restore default composite mode
        this.ctx.globalCompositeOperation = "source-over";
    
        // Draw even darker section
        this.ctx.fillStyle = "#1A0033"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add eerie glow around the moon
        const gradient = this.ctx.createRadialGradient(
          moonX, moonY, moonRadius,
          moonX, moonY, moonRadius * 2
        );
        gradient.addColorStop(0, "rgba(75, 0, 130, 0.4)");
        gradient.addColorStop(1, "rgba(75, 0, 130, 0)");
        
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
      
      /*** ✅ 预生成并绘制旋转阴影 ***/
    generateSwirlingShadows(count) {
        let shadows = [];
        for (let i = 0; i < count; i++) {
            let centerX = Math.random() * this.canvas.width;
            let centerY = Math.random() * this.canvas.height;
            let radius = 20 + Math.random() * 30;
            shadows.push({ centerX, centerY, radius });
        }
        return shadows;
    }

    drawSwirlingShadows() {
        this.staticElements.swirlingShadows.forEach(shadow => {
            this.ctx.beginPath();
            this.ctx.arc(shadow.centerX, shadow.centerY, shadow.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(40, 40, 40, 0.3)";
            this.ctx.fill();
        });
    }

     /*** ✅ 预生成并绘制黑暗水晶 ***/
    generateDarkCrystals(count) {
        let crystals = [];
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            let size = 10 + Math.random() * 30;
            crystals.push({ x, y, size });
        }
        return crystals;
    }

    drawDarkCrystals() {
        this.staticElements.darkCrystals.forEach(crystal => {
            this.ctx.fillStyle = "#551A8B";
            this.ctx.beginPath();
            this.ctx.moveTo(crystal.x, crystal.y - crystal.size);
            this.ctx.lineTo(crystal.x + crystal.size / 2, crystal.y);
            this.ctx.lineTo(crystal.x, crystal.y + crystal.size);
            this.ctx.lineTo(crystal.x - crystal.size / 2, crystal.y);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

      drawEerieGlow() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.canvas.width / 3;
        
        const gradient = this.ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );
        
        gradient.addColorStop(0, "rgba(70, 20, 90, 0.2)");
        gradient.addColorStop(0.7, "rgba(40, 10, 60, 0.05)");
        gradient.addColorStop(1, "rgba(20, 0, 30, 0)");
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
      
       /*** ✅ 预生成并绘制影子生物 ***/
        generateShadowCreatures(count) {
            let creatures = [];
            for (let i = 0; i < count; i++) {
                let x = Math.random() * this.canvas.width;
                let y = this.canvas.height - 100 - Math.random() * 100;
                let height = 40 + Math.random() * 60;
                creatures.push({ x, y, height });
            }
            return creatures;
        }

        drawShadowCreatures() {
            this.staticElements.shadowCreatures.forEach(creature => {
                this.ctx.strokeStyle = "rgba(30, 30, 40, 0.7)";
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(creature.x, creature.y - creature.height, creature.height / 4, 0, Math.PI * 2);
                this.ctx.moveTo(creature.x, creature.y - creature.height + creature.height / 4);
                this.ctx.lineTo(creature.x, creature.y);
                this.ctx.stroke();
            });
        }

       /*** ✅ 预生成并绘制星星 ***/
        generateStars(count) {
            let stars = [];
            for (let i = 0; i < count; i++) {
                let x = Math.random() * this.canvas.width;
                let y = Math.random() * (this.canvas.height * 0.7);
                let size = Math.random() * 2;
                let alpha = 0.3 + Math.random() * 0.7;
                stars.push({ x, y, size, alpha });
            }
            return stars;
        }

        drawStars() {
            this.staticElements.stars.forEach(star => {
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                this.ctx.fill();
            });
        }
      
      drawMoon() {
        const moonX = this.canvas.width * 0.8;
        const moonY = this.canvas.height * 0.1;
        const moonRadius = this.canvas.width * 0.04;
    
        // Main moon (light yellow)
        this.ctx.fillStyle = "#F0E68C"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        this.ctx.fill();
    
        // Use destination-out to create crescent shape
        this.ctx.globalCompositeOperation = "destination-out"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
    
        // Restore default composite mode
        this.ctx.globalCompositeOperation = "source-over";
    
        // Draw dark blue section
        this.ctx.fillStyle = "#191970"; 
        this.ctx.beginPath();
        this.ctx.arc(moonX - moonRadius * 0.4, moonY, moonRadius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add subtle glow
        const gradient = this.ctx.createRadialGradient(
          moonX, moonY, moonRadius,
          moonX, moonY, moonRadius * 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 200, 0.4)");
        gradient.addColorStop(1, "rgba(255, 255, 200, 0)");
        
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
        generateSilhouetteLandscape() {
            let silhouetteLandscape = {
                mountains: [],
                terrain: []
            }
            let x = 0;
        
            // 预生成背景山脉数据
            while (x < this.canvas.width) {
                const peakHeight = this.canvas.height * 0.2 + Math.random() * this.canvas.height * 0.1;
                const peakWidth = 80 + Math.random() * 100;
        
                silhouetteLandscape.mountains.push({
                    x: x,
                    peakX: x + peakWidth / 2,
                    peakY: this.canvas.height * 0.75 - peakHeight,
                    endX: x + peakWidth
                });
        
                x += peakWidth;
            }
        
            x = 0;
            
            // 预生成前景地形数据
            while (x < this.canvas.width) {
                const hillWidth = 50 + Math.random() * 80;
                const hillHeight = Math.random() * this.canvas.height * 0.05;
        
                silhouetteLandscape.terrain.push({
                    startX: x,
                    controlX: x + hillWidth / 2,
                    controlY: this.canvas.height * 0.85 - hillHeight,
                    endX: x + hillWidth
                });
        
                x += hillWidth;
            }

            return silhouetteLandscape;
        }
        
        drawSilhouetteLandscape() {
            // 绘制背景山脉
            this.ctx.fillStyle = "rgba(5, 5, 15, 1)";
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height * 0.75);
        
            this.staticElements.silhouetteLandscape.mountains.forEach(mountain => {
                this.ctx.lineTo(mountain.peakX, mountain.peakY);
                this.ctx.lineTo(mountain.endX, this.canvas.height * 0.75);
            });
        
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        
            // 绘制前景地形
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height * 0.85);
        
            this.staticElements.silhouetteLandscape.terrain.forEach(hill => {
                this.ctx.quadraticCurveTo(hill.controlX, hill.controlY, hill.endX, this.canvas.height * 0.85);
            });
        
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        
            // 绘制静态草丛
            this.staticElements.grassPatches.forEach(patch => {
                if (patch.y > this.canvas.height * 0.85) {
                    this.drawGrass(patch.x, patch.y);
                }
            });
        }
        

        /*** ✅ 预生成并绘制战斗特效 ***/
        generateBattleEffects(count) {
            let effects = [];
            for (let i = 0; i < count; i++) {
                let x = Math.random() * this.canvas.width;
                let y = this.canvas.height * 0.7 + Math.random() * (this.canvas.height * 0.2);
                let size = 1 + Math.random() * 3;
                let color = `rgba(${Math.floor(Math.random() * 255)}, 
                                ${Math.floor(Math.random() * 255)}, 
                                ${Math.floor(Math.random() * 255)}, 
                                ${0.3 + Math.random() * 0.7})`;
                effects.push({ x, y, size, color });
            }
            return effects;
        }

        drawBattleEffects() {
            this.staticElements.battleEffects.forEach(effect => {
                this.ctx.beginPath();
                this.ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
                this.ctx.fillStyle = effect.color;
                this.ctx.fill();
            });
        }


      drawStormySky() {
        // Storm background using reference method
        this.ctx.fillStyle = "#2F4F4F"; // Dark gray storm sky
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
        
        // Ground
        this.ctx.fillStyle = "#191919"; // Very dark ground for fortress
        this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
        
        // Draw cloud layers
        this.staticElements.clouds.forEach(cloud => {
          this.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height);
        });
      }
      
      drawFortress() {
        // Main castle body
        this.ctx.fillStyle = "#0a0a14";
        
        // Main tower
        const mainTowerWidth = this.canvas.width * 0.2;
        const mainTowerHeight = this.canvas.height * 0.5;
        const mainTowerX = this.canvas.width * 0.4;
        const mainTowerY = this.canvas.height * 0.5;
        
        this.ctx.fillRect(
          mainTowerX, 
          mainTowerY, 
          mainTowerWidth, 
          mainTowerHeight
        );
        
        // Tower top (pointed)
        this.ctx.beginPath();
        this.ctx.moveTo(mainTowerX, mainTowerY);
        this.ctx.lineTo(mainTowerX + mainTowerWidth / 2, mainTowerY - mainTowerHeight * 0.3);
        this.ctx.lineTo(mainTowerX + mainTowerWidth, mainTowerY);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Side towers
        const sideTowerWidth = this.canvas.width * 0.12;
        const sideTowerHeight = this.canvas.height * 0.4;
        
        // Left tower
        this.ctx.fillRect(
          mainTowerX - sideTowerWidth - 10, 
          mainTowerY + 20, 
          sideTowerWidth, 
          sideTowerHeight
        );
        
        // Right tower
        this.ctx.fillRect(
          mainTowerX + mainTowerWidth + 10, 
          mainTowerY + 20, 
          sideTowerWidth, 
          sideTowerHeight
        );
        
        // Left tower top
        this.ctx.beginPath();
        this.ctx.moveTo(mainTowerX - sideTowerWidth - 10, mainTowerY + 20);
        this.ctx.lineTo(mainTowerX - sideTowerWidth - 10 + sideTowerWidth / 2, mainTowerY - 30);
        this.ctx.lineTo(mainTowerX - 10, mainTowerY + 20);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right tower top
        this.ctx.beginPath();
        this.ctx.moveTo(mainTowerX + mainTowerWidth + 10, mainTowerY + 20);
        this.ctx.lineTo(mainTowerX + mainTowerWidth + 10 + sideTowerWidth / 2, mainTowerY - 30);
        this.ctx.lineTo(mainTowerX + mainTowerWidth + 10 + sideTowerWidth, mainTowerY + 20);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Windows
        this.ctx.fillStyle = "#600a0a";
        
        // Main tower windows
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 2; j++) {
            this.ctx.fillRect(
              mainTowerX + mainTowerWidth * 0.25 + j * mainTowerWidth * 0.4,
              mainTowerY + 30 + i * 80,
              mainTowerWidth * 0.1,
              mainTowerHeight * 0.1
            );
          }
        }
        
        // Side tower windows
        for (let i = 0; i < 2; i++) {
          // Left tower windows
          this.ctx.fillRect(
            mainTowerX - sideTowerWidth - 10 + sideTowerWidth * 0.35,
            mainTowerY + 60 + i * 80,
            sideTowerWidth * 0.3,
            sideTowerHeight * 0.1
          );
          
          // Right tower windows
          this.ctx.fillRect(
            mainTowerX + mainTowerWidth + 10 + sideTowerWidth * 0.35,
            mainTowerY + 60 + i * 80,
            sideTowerWidth * 0.3,
            sideTowerHeight * 0.1
          );
        }
      }
      
      drawLightning() {
        const startX = Math.random() * this.canvas.width; // Lightning starting position
        const startY = 0; // Starts from the top of the sky
        const endY = this.canvas.height * 0.6; // Ends near the ground
     
        this.ctx.strokeStyle = "#FFFF33"; // Bright yellow lightning
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
     
        let x = startX, y = startY;
        for (let i = 0; i < 8; i++) { // 8 segments to create a zigzag effect
          x += (Math.random() - 0.5) * 80; // Random lateral shifts
          y += (endY - startY) / 8; // Moves downward
          this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        // Add lightning glow
        this.ctx.shadowColor = "#FFFF33";
        this.ctx.shadowBlur = 20;
        this.ctx.stroke();
        
        // Reset shadow effects
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "transparent";
      }
      
      drawDarkEnergy() {
        // Dark energy circles around castle
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height * 0.7;
        
        for (let i = 0; i < 3; i++) {
          const radius = 100 + i * 50;
          
          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(100, 0, 80, ${0.4 - i * 0.1})`;
          this.ctx.lineWidth = 3;
          this.ctx.stroke();
        }
        
        // Energy particles
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 200;
          
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const size = 2 + Math.random() * 3;
          
          this.ctx.beginPath();
          this.ctx.arc(x, y, size, 0, Math.PI * 2);
          
          const gradientEnergy = this.ctx.createRadialGradient(
            x, y, 0,
            x, y, size * 2
          );
          
          gradientEnergy.addColorStop(0, "rgba(150, 0, 150, 0.8)");
          gradientEnergy.addColorStop(1, "rgba(80, 0, 80, 0)");
          
          this.ctx.fillStyle = gradientEnergy;
          this.ctx.fill();
        }
      }


       // Implement missing helper methods
  drawTreeOfAges(x, y) {
    // Implementation for drawing the Tree of Ages
    this.ctx.save();
    this.ctx.translate(x, y);
    
    // Draw trunk
    this.ctx.fillStyle = '#4B3621';
    this.ctx.beginPath();
    this.ctx.moveTo(-20, 0);
    this.ctx.lineTo(20, 0);
    this.ctx.lineTo(10, -100);
    this.ctx.lineTo(-10, -100);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Draw foliage
    this.ctx.fillStyle = '#228B22';
    this.ctx.beginPath();
    this.ctx.arc(0, -120, 60, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  drawLightOrbs(x, y, count) {
    // Implementation for drawing light orbs
    this.ctx.save();
    this.ctx.translate(x, y);
    
    for (let i = 0; i < count; i++) {
      const orbX = Math.random() * 200 - 100;
      const orbY = Math.random() * 200 - 100;
      const radius = Math.random() * 5 + 2;
      
      const gradient = this.ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.ctx.restore();
  }

  drawShimmeringPools(x, y, width, height) {
    // Implementation for drawing shimmering pools
    this.ctx.save();
    this.ctx.translate(x, y);
    
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4FC3F7');
    gradient.addColorStop(0.5, '#29B6F6');
    gradient.addColorStop(1, '#03A9F4');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Add shimmering effect
    this.ctx.globalCompositeOperation = 'overlay';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 10; i++) {
      const shimmerX = Math.random() * width;
      const shimmerY = Math.random() * height;
      const shimmerRadius = Math.random() * 10 + 5;
      this.ctx.beginPath();
      this.ctx.arc(shimmerX, shimmerY, shimmerRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.ctx.restore();
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
    drawLavaStreams(count) {
        for (let i = 0; i < count; i++) {
            let startX = this.canvas.width * (0.2 + Math.random() * 0.6);
            let startY = this.canvas.height * 0.8;
            let endY = this.canvas.height;
    
            let gradient = this.ctx.createLinearGradient(startX, startY, startX, endY);
            gradient.addColorStop(0, "rgba(255, 69, 0, 1)");
            gradient.addColorStop(0.5, "rgba(255, 140, 0, 1)");
            gradient.addColorStop(1, "rgba(255, 69, 0, 0.8)");
    
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
    
            // Create a wavy pattern for the lava
            let x = startX;
            let y = startY;
            let waveWidth = 20 + Math.random() * 10;
            let waveHeight = 15 + Math.random() * 10;
            while (y < endY) {
                let controlX = x + (Math.random() > 0.5 ? waveWidth : -waveWidth);
                let controlY = y + waveHeight;
                let endX = x;
                let endY = y + waveHeight * 2;
    
                this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
                y = endY;
            }
    
            this.ctx.lineTo(startX + 10, this.canvas.height);
            this.ctx.lineTo(startX - 10, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    drawSilhouetteTrees(count) {
        this.ctx.fillStyle = "rgba(10, 10, 10, 0.9)"; // 深色剪影树
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = this.canvas.height * (0.5 + Math.random() * 0.5); // 树的根部位置
            let height = this.canvas.height * (0.2 + Math.random() * 0.3); // 树的高度
            let width = height * 0.2; // 树干宽度
    
            // 画树干
            this.ctx.fillRect(x - width / 2, y - height, width, height);
    
            // 画树冠（用随机弧线模拟叶子轮廓）
            this.ctx.beginPath();
            this.ctx.arc(x, y - height, width * 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    drawGlowingMushrooms(count) {
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = this.canvas.height * (0.7 + Math.random() * 0.2);
            let size = this.canvas.width * 0.015; // 蘑菇大小

            // 创建蘑菇发光效果
            let gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 2);
            gradient.addColorStop(0, "rgba(100, 255, 150, 0.8)");
            gradient.addColorStop(1, "rgba(100, 255, 150, 0)");

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            // 画蘑菇本体
            this.ctx.fillStyle = "#32CD32"; // 绿色
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI, true);
            this.ctx.fill();

            this.ctx.fillStyle = "#8B4513"; // 棕色的蘑菇茎
            this.ctx.fillRect(x - size * 0.2, y, size * 0.4, size * 1.5);
        }
    }
    drawMistWisps() {
        this.ctx.fillStyle = "rgba(200, 200, 200, 0.1)"; // 半透明雾气
    
        for (let i = 0; i < 5; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height * 0.6;
            let width = this.canvas.width * (0.2 + Math.random() * 0.3);
            let height = width * 0.4;
    
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, width, height, Math.random() * Math.PI, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    drawEerieEyes(count) {
        for (let i = 0; i < count; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height * 0.4; // 眼睛在森林深处
            let eyeSize = this.canvas.width * 0.008;
    
            this.ctx.fillStyle = "rgba(255, 0, 0, 0.8)"; // 红色眼睛
            this.ctx.beginPath();
            this.ctx.arc(x - eyeSize, y, eyeSize, 0, Math.PI * 2);
            this.ctx.arc(x + eyeSize, y, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    // 假设这些函数是 Drawer 类的一部分
// Drawer 类包含绘图上下文 (ctx)

/**
 * 绘制噩梦尖塔主体结构
 * @param {number} centerX - 尖塔中心X坐标
 * @param {number} centerY - 尖塔顶部Y坐标
 */
drawNightmareSpire(centerX, centerY) {
    // 获取尖塔的高度和宽度
    const spireHeight = this.ctx.canvas.height * 0.7; // 尖塔高度为画布高度的70%
    const spireBaseWidth = this.ctx.canvas.width * 0.3; // 尖塔底部宽度

    // 创建尖塔渐变
    const spireGradient = this.ctx.createLinearGradient(
        centerX, centerY, 
        centerX, centerY + spireHeight
    );
    spireGradient.addColorStop(0, "#2D0A4F"); // 顶部暗紫色
    spireGradient.addColorStop(0.3, "#1A062E"); // 中部更暗的紫色
    spireGradient.addColorStop(1, "#09021A"); // 底部几乎黑色

    this.ctx.fillStyle = spireGradient;

    // 绘制尖塔主体（锯齿状）
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY); // 尖塔顶点

    // 左侧锯齿
    const jaggednessLeft = 8; // 锯齿数量
    const leftEdge = centerX - spireBaseWidth / 2;
    for (let i = 0; i < jaggednessLeft; i++) {
        const yProgress = (i + 1) / jaggednessLeft;
        const currentY = centerY + spireHeight * yProgress;
        const offsetX = Math.random() * 20 - 10; // 随机锯齿偏移
        this.ctx.lineTo(leftEdge + offsetX, currentY);
    }

    // 底部
    this.ctx.lineTo(centerX - spireBaseWidth / 2, centerY + spireHeight);
    this.ctx.lineTo(centerX + spireBaseWidth / 2, centerY + spireHeight);

    // 右侧锯齿
    const jaggednessRight = 8; // 锯齿数量
    const rightEdge = centerX + spireBaseWidth / 2;
    for (let i = jaggednessRight - 1; i >= 0; i--) {
        const yProgress = (i + 1) / jaggednessRight;
        const currentY = centerY + spireHeight * yProgress;
        const offsetX = Math.random() * 20 - 10; // 随机锯齿偏移
        this.ctx.lineTo(rightEdge + offsetX, currentY);
    }

    this.ctx.closePath();
    this.ctx.fill();

    // 添加尖塔内部纹理/细节
    this.drawSpireDetails(centerX, centerY, spireHeight, spireBaseWidth);
}

/**
 * 绘制尖塔内部细节
 * @private
 */
drawSpireDetails(centerX, centerY, spireHeight, spireBaseWidth) {
    // 绘制几条竖直的暗线
    this.ctx.strokeStyle = "rgba(78, 30, 109, 0.4)";
    this.ctx.lineWidth = 2;

    for (let i = 0; i < 5; i++) {
        const xPos = centerX - spireBaseWidth * 0.3 + spireBaseWidth * 0.6 * (i / 4);
        
        this.ctx.beginPath();
        this.ctx.moveTo(xPos, centerY + spireHeight * 0.2);
        
        // 弯曲的线条
        const cp1x = xPos - 15 + Math.random() * 30;
        const cp1y = centerY + spireHeight * 0.4;
        const cp2x = xPos - 15 + Math.random() * 30;
        const cp2y = centerY + spireHeight * 0.6;
        
        this.ctx.bezierCurveTo(
            cp1x, cp1y,
            cp2x, cp2y,
            xPos, centerY + spireHeight * 0.8
        );
        
        this.ctx.stroke();
    }

    // 绘制几个暗紫色的能量窗口/裂缝
    this.ctx.fillStyle = "rgba(131, 19, 199, 0.5)";
    
    for (let i = 0; i < 6; i++) {
        const height = 15 + Math.random() * 40;
        const width = 5 + Math.random() * 10;
        const xPos = centerX - spireBaseWidth * 0.35 + spireBaseWidth * 0.7 * Math.random();
        const yPos = centerY + spireHeight * (0.3 + 0.5 * Math.random());
        
        this.ctx.beginPath();
        this.ctx.ellipse(xPos, yPos, width, height, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加发光效果
        const glow = this.ctx.createRadialGradient(
            xPos, yPos, 0,
            xPos, yPos, width * 3
        );
        glow.addColorStop(0, "rgba(131, 19, 199, 0.3)");
        glow.addColorStop(1, "rgba(131, 19, 199, 0)");
        
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.ellipse(xPos, yPos, width * 3, height * 3, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

/**
 * 绘制虚空触手
 * @param {number} count - 触手数量
 */
drawVoidTentacles(count) {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    
    // 触手起点在画布底部的不同位置
    for (let i = 0; i < count; i++) {
        // 随机起点和控制点
        const startX = canvasWidth * (0.1 + 0.8 * Math.random());
        const startY = canvasHeight * (0.7 + 0.3 * Math.random());
        
        // 触手目标位置靠近中心
        const targetX = canvasWidth * 0.5 + (Math.random() - 0.5) * canvasWidth * 0.3;
        const targetY = canvasHeight * 0.3 + (Math.random() - 0.5) * canvasHeight * 0.2;
        
        // 控制点，使触手看起来更弯曲
        const cpX1 = startX + (targetX - startX) * 0.3 + (Math.random() - 0.5) * 100;
        const cpY1 = startY + (targetY - startY) * 0.3 + (Math.random() - 0.5) * 100;
        const cpX2 = startX + (targetX - startX) * 0.6 + (Math.random() - 0.5) * 100;
        const cpY2 = startY + (targetY - startY) * 0.6 + (Math.random() - 0.5) * 100;
        
        // 触手宽度随机
        const tentacleWidth = 5 + Math.random() * 15;
        
        // 创建触手渐变
        const tentacleGradient = this.ctx.createLinearGradient(startX, startY, targetX, targetY);
        tentacleGradient.addColorStop(0, "rgba(39, 11, 59, 0.7)");
        tentacleGradient.addColorStop(0.5, "rgba(75, 20, 113, 0.5)");
        tentacleGradient.addColorStop(1, "rgba(131, 19, 199, 0)");
        
        // 绘制主触手
        this.ctx.lineWidth = tentacleWidth;
        this.ctx.strokeStyle = tentacleGradient;
        this.ctx.lineCap = "round";
        
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, targetX, targetY);
        this.ctx.stroke();
        
        // 添加细小分支
        const branchCount = 2 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < branchCount; j++) {
            const t = 0.3 + 0.5 * Math.random(); // 在触手主体上的位置
            
            // 计算分支起点
            const branchStartX = this.bezierPoint(startX, cpX1, cpX2, targetX, t);
            const branchStartY = this.bezierPoint(startY, cpY1, cpY2, targetY, t);
            
            // 计算该点的切线方向
            const tangentX = this.bezierTangent(startX, cpX1, cpX2, targetX, t);
            const tangentY = this.bezierTangent(startY, cpY1, cpY2, targetY, t);
            
            // 切线垂直方向
            const perpX = -tangentY;
            const perpY = tangentX;
            
            // 归一化
            const length = Math.sqrt(perpX * perpX + perpY * perpY);
            const normPerpX = perpX / length;
            const normPerpY = perpY / length;
            
            // 分支长度
            const branchLength = 20 + Math.random() * 50;
            
            // 分支终点
            const branchEndX = branchStartX + normPerpX * branchLength;
            const branchEndY = branchStartY + normPerpY * branchLength;
            
            // 创建分支渐变
            const branchGradient = this.ctx.createLinearGradient(
                branchStartX, branchStartY, branchEndX, branchEndY
            );
            branchGradient.addColorStop(0, "rgba(75, 20, 113, 0.5)");
            branchGradient.addColorStop(1, "rgba(131, 19, 199, 0)");
            
            // 绘制分支
            this.ctx.lineWidth = tentacleWidth * 0.5;
            this.ctx.strokeStyle = branchGradient;
            
            this.ctx.beginPath();
            this.ctx.moveTo(branchStartX, branchStartY);
            this.ctx.lineTo(branchEndX, branchEndY);
            this.ctx.stroke();
        }
    }
}

/**
 * 计算贝塞尔曲线上的点
 * @private
 */
bezierPoint(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t2 * p2 + t3 * p3;
}

/**
 * 计算贝塞尔曲线上点的切线
 * @private
 */
bezierTangent(p0, p1, p2, p3, t) {
    const t2 = t * t;
    return 3 * (1 - t) * (1 - t) * (p1 - p0) + 6 * (1 - t) * t * (p2 - p1) + 3 * t2 * (p3 - p2);
}

/**
 * 绘制被腐蚀的水晶
 * @param {number} count - 水晶数量
 */
drawCorruptedCrystals(count) {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    
    for (let i = 0; i < count; i++) {
        // 随机位置偏向画布两侧
        let xPos;
        if (Math.random() < 0.5) {
            xPos = canvasWidth * 0.1 + canvasWidth * 0.25 * Math.random(); // 左侧
        } else {
            xPos = canvasWidth * 0.65 + canvasWidth * 0.25 * Math.random(); // 右侧
        }
        
        // 在中下部区域分布
        const yPos = canvasHeight * (0.4 + 0.5 * Math.random());
        
        // 水晶尺寸
        const crystalSize = 15 + Math.random() * 35;
        
        // 随机角度
        const angle = Math.random() * Math.PI;
        
        // 水晶颜色 - 紫色到青色的渐变
        const hue = 260 + Math.random() * 40; // 紫色到青紫色
        const mainColor = `hsl(${hue}, 70%, 25%)`;
        const glowColor = `hsl(${hue}, 90%, 40%)`;
        
        // 绘制水晶主体
        this.ctx.save();
        this.ctx.translate(xPos, yPos);
        this.ctx.rotate(angle);
        
        // 创建水晶形状（类似六边形但不规则）
        this.ctx.beginPath();
        
        // 创建不规则水晶形状的点
        const points = [];
        const sides = 5 + Math.floor(Math.random() * 3); // 5-7边形
        
        for (let j = 0; j < sides; j++) {
            const pointAngle = (j / sides) * Math.PI * 2;
            const distance = crystalSize * (0.8 + Math.random() * 0.4); // 不规则距离
            
            points.push({
                x: Math.cos(pointAngle) * distance,
                y: Math.sin(pointAngle) * distance
            });
        }
        
        // 绘制水晶外形
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let j = 1; j < points.length; j++) {
            this.ctx.lineTo(points[j].x, points[j].y);
        }
        this.ctx.closePath();
        
        // 填充水晶
        const crystalGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, crystalSize);
        crystalGradient.addColorStop(0, mainColor);
        crystalGradient.addColorStop(0.7, `hsla(${hue}, 70%, 25%, 0.8)`); // CC is about 80% opacity
        crystalGradient.addColorStop(1, `hsla(${hue}, 70%, 25%, 0.6)`); // 99 is about 60% opacity
                
        this.ctx.fillStyle = crystalGradient;
        this.ctx.fill();
        
        // 添加水晶内部纹理线条
        this.ctx.strokeStyle = `${glowColor}66`; // 半透明
        this.ctx.lineWidth = 1;
        
        // 内部纹理线
        for (let j = 0; j < 3; j++) {
            const startPoint = points[Math.floor(Math.random() * points.length)];
            const endPoint = points[Math.floor(Math.random() * points.length)];
            
            this.ctx.beginPath();
            this.ctx.moveTo(startPoint.x * 0.5, startPoint.y * 0.5);
            this.ctx.lineTo(endPoint.x * 0.5, endPoint.y * 0.5);
            this.ctx.stroke();
        }
        
        // 添加发光效果
        const glowGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, crystalSize * 1.5);
        glowGradient.addColorStop(0, `hsla(${hue}, 90%, 40%, 0.2)`); // 33 hex is approximately 20% opacity
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, crystalSize * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

/**
 * 绘制旋转的暗影/能量
 */
drawSwirlingShadows() {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    const centerX = canvasWidth * 0.5;
    const centerY = canvasHeight * 0.5;
    
    // 创建几个能量漩涡
    const swirlCount = 3;
    
    for (let i = 0; i < swirlCount; i++) {
        // 随机偏移中心位置
        const swirlCenterX = centerX + (Math.random() - 0.5) * canvasWidth * 0.5;
        const swirlCenterY = centerY + (Math.random() - 0.5) * canvasHeight * 0.3;
        
        // 漩涡大小
        const swirlRadius = 50 + Math.random() * 100;
        
        // 漩涡渐变
        const swirlGradient = this.ctx.createRadialGradient(
            swirlCenterX, swirlCenterY, 0,
            swirlCenterX, swirlCenterY, swirlRadius
        );
        
        // 随机紫色/蓝色色调
        const hue = 260 + Math.floor(Math.random() * 40);
        
        swirlGradient.addColorStop(0, `hsla(${hue}, 70%, 20%, 0.7)`);
        swirlGradient.addColorStop(0.5, `hsla(${hue}, 60%, 10%, 0.4)`);
        swirlGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        this.ctx.fillStyle = swirlGradient;
        
        // 绘制漩涡基本形状
        this.ctx.beginPath();
        this.ctx.arc(swirlCenterX, swirlCenterY, swirlRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加旋转纹理
        const rotationSegments = 7 + Math.floor(Math.random() * 5);
        const rotationFactor = Math.random() * 0.2 + 0.1; // 旋转强度
        
        this.ctx.strokeStyle = `hsla(${hue}, 80%, 30%, 0.3)`;
        this.ctx.lineWidth = 2;
        
        for (let j = 0; j < rotationSegments; j++) {
            const angle = (j / rotationSegments) * Math.PI * 2;
            const startRadius = swirlRadius * 0.2;
            
            this.ctx.beginPath();
            
            // 创建旋涡形状
            for (let r = startRadius; r <= swirlRadius; r += 2) {
                const curAngle = angle + rotationFactor * r;
                const x = swirlCenterX + Math.cos(curAngle) * r;
                const y = swirlCenterY + Math.sin(curAngle) * r;
                
                if (r === startRadius) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
        
        // 添加一些随机的能量微粒
        const particleCount = 20 + Math.floor(Math.random() * 30);
        this.ctx.fillStyle = `hsla(${hue}, 90%, 50%, 0.7)`;
        
        for (let j = 0; j < particleCount; j++) {
            const particleAngle = Math.random() * Math.PI * 2;
            const particleDistance = Math.random() * swirlRadius;
            const particleSize = 1 + Math.random() * 2;
            
            const x = swirlCenterX + Math.cos(particleAngle) * particleDistance;
            const y = swirlCenterY + Math.sin(particleAngle) * particleDistance;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    // 添加整体氛围效果
    this.drawAtmosphericShadows();
}

/**
 * 绘制整体氛围阴影效果
 * @private
 */
drawAtmosphericShadows() {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    
    // 添加几条大型的弯曲阴影带
    const shadowBandCount = 4;
    
    for (let i = 0; i < shadowBandCount; i++) {
        // 生成随机控制点
        const startX = -50 + Math.random() * 100;
        const startY = Math.random() * canvasHeight;
        
        const endX = canvasWidth + Math.random() * 100 - 50;
        const endY = Math.random() * canvasHeight;
        
        const cp1x = canvasWidth * 0.33 + (Math.random() - 0.5) * 100;
        const cp1y = Math.random() * canvasHeight;
        
        const cp2x = canvasWidth * 0.66 + (Math.random() - 0.5) * 100;
        const cp2y = Math.random() * canvasHeight;
        
        // 阴影带宽度
        const bandWidth = 30 + Math.random() * 70;
        
        // 随机紫色/蓝色阴影
        const hue = 250 + Math.floor(Math.random() * 40);
        const shadowColor = `hsla(${hue}, 70%, 10%, 0.2)`;
        
        this.ctx.strokeStyle = shadowColor;
        this.ctx.lineWidth = bandWidth;
        this.ctx.lineCap = "round";
        
        // 绘制阴影带
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        this.ctx.stroke();
    }
}


    drawAncientRunes() {
        const runeCount = 10;
        const runeSymbols = ["ᛟ", "ᛊ", "ᚨ", "ᚱ", "ᚷ", "ᚢ", "ᚦ", "ᛗ", "ᛁ", "ᛉ"];
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "rgba(255, 215, 0, 0.7)"; // Gold-like glow
    
        for (let i = 0; i < runeCount; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height * 0.6;
    
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate((Math.random() - 0.5) * Math.PI / 2);
            this.ctx.fillText(runeSymbols[Math.floor(Math.random() * runeSymbols.length)], 0, 0);
            this.ctx.restore();
        }
    }
    

    redrawStormBackground() {
        this.ctx.fillStyle = "#2F4F4F"; // Dark gray storm sky
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);
        this.ctx.fillStyle = "#6B8E23"; // Dark green grass
        this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);
        this.drawRain();
    }


     // Draw grass (triangle)
     drawGrass(x, y) {
        this.ctx.fillStyle = "#228B22";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - this.canvas.width * 0.005, y + this.canvas.width * 0.02);
        this.ctx.lineTo(x + this.canvas.width * 0.005, y + this.canvas.width * 0.02);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Draw cloud (ellipse)
    drawCloud(x, y, width, height) {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    
    
    // Draw the sun
    drawSun(x, y, radius) {
        this.ctx.fillStyle = "#FFD700";
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    // **Draw rain**
    drawRain() {
        this.ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            this.ctx.fillRect(x, y, 2, 10);
        }
    }

}
