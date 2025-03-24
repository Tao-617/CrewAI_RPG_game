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
