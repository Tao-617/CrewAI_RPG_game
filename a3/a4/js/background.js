import { Drawer } from "./drawer.js";

export class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.backgroundState = "verdantHeartlands"; // 初始场景
        this.drawer = new Drawer(canvas, this);

        // 预加载背景图
        this.backgroundImages = {
            verdantHeartlands: this.loadImage("images/backgrounds/verdant_heartlands.png"),
            templeEternalDawn: this.loadImage("images/backgrounds/temple_of_eternal_dawn.png"),
            thunderpeakMountains: this.loadImage("images/backgrounds/thunderpeak_mountains.png"),
            earthheartForge: this.loadImage("images/backgrounds/earthheart_forge.png"),
            whisperingWoods: this.loadImage("images/backgrounds/whispering_woods.png"),
            nightmareSpire: this.loadImage("images/backgrounds/nightmare_spire.png"),
            restoredGoldenCity: this.loadImage("images/backgrounds/restored_golden_city.png"),
            abyssalRift: this.loadImage("images/backgrounds/nightmare_spire.png"), // 暂用同一张
        };
    }

    loadImage(path) {
        const img = new Image();
        img.src = path;
        return img;
    }

    switchBackground(scene) {
        switch (scene) {
            case "verdantHeartlands":
            case "templeEternalDawn":
            case "thunderpeakMountains":
            case "earthheartForge":
            case "whisperingWoods":
            case "nightmareSpire":
            case "restoredGoldenCity":
                this.backgroundState = scene;
                break;
            case "win":
                this.backgroundState = "restoredGoldenCity";
                break;
            case "lose":
                this.backgroundState = "abyssalRift";
                break;
            default:
                this.backgroundState = "verdantHeartlands";
        }
    }

    drawBackground() {
        // 绘制当前背景图
        const bgImage = this.backgroundImages[this.backgroundState];
        if (bgImage && bgImage.complete) {
            this.ctx.drawImage(bgImage, 0, 0, this.canvas.width, this.canvas.height);
        }

        // 动态绘制云朵、草地、前景树
        if (this.backgroundState !== "nightmareSpire" && this.backgroundState !== "abyssalRift") {
            this.drawer.staticElements.clouds.forEach(cloud => 
                this.drawer.drawCloud(cloud.x, cloud.y, cloud.width, cloud.height)
            );
            this.drawer.staticElements.grassPatches.forEach(grass => 
                this.drawer.drawGrass(grass.x, grass.y, grass.width, grass.height)
            );
            this.drawer.staticElements.trees.forEach(tree => 
                this.drawer.drawTrees(tree.x, tree.y, tree.width, tree.height)
            );
        }
    }

    moveObjects(logic) {
        if (logic.keys.d && logic.player.x >= (this.canvas.width * 4 / 5)) {
            logic.player.x = this.canvas.width * 4 / 5;
            logic.distanceTraveled += logic.player.speed;

            // 移动动态元素
            this.drawer.staticElements.clouds.forEach(cloud => {
                cloud.x -= logic.player.speed * 0.5;
                if (cloud.x < -cloud.width) {
                    cloud.x = this.canvas.width + Math.random() * 50;
                    cloud.y = Math.random() * this.canvas.height * 0.3;
                }
            });

            this.drawer.staticElements.grassPatches.forEach(grass => {
                grass.x -= logic.player.speed;
                if (grass.x < -grass.width) {
                    grass.x = this.canvas.width + Math.random() * 50;
                    grass.y = this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.4;
                }
            });

            this.drawer.staticElements.trees.forEach(tree => {
                tree.x -= logic.player.speed * 0.7;
                if (tree.x < -tree.width) {
                    tree.x = this.canvas.width + Math.random() * 100;
                    tree.y = this.canvas.height * (0.55 + Math.random() * 0.1);
                }
            });

        } else if (logic.keys.d) {
            logic.player.x += logic.player.speed;
        } else if (logic.keys.a && logic.player.x > 0) {
            logic.player.x -= logic.player.speed;
        }
    }
}
