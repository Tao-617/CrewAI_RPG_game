export class DialogueSystem {
    constructor(canvas, background) {
        this.canvas = canvas;
        this.background = background;
        this.showDialog = false; // Whether to show dialogue box
        this.dialogScenes = dialogScenes; // Load dialogue data
        this.isSceneCompleted = this.initializeSceneCompletion(dialogScenes);
        this.currentLineIndex = 0; // Track current dialogue index
        this.currentSpeaker = ''; // Current speaker
        this.isPaused = false; // Control whether the game is paused
        this.currentScene = 'start'; // Current dialogue scene

    }

    // 🚀 Switch dialogue and background immediately at the start
    switchDialog(sceneName) {
        if (dialogScenes[sceneName] && !this.isSceneCompleted[sceneName]) {
            this.currentScene = sceneName;
            this.isSceneCompleted[sceneName] = true; // Mark the scene as completed immediately

            // 🔹 Switch background BEFORE showing dialogue
            this.background.switchBackground(sceneName); 
            
            this.currentLineIndex = 0; // Reset dialogue index
            this.showDialogLine(); // Start the dialogue
        }
    }


    initializeSceneCompletion(dialogScenes) {
        let sceneCompleted = {};
        for (let scene in dialogScenes) {
            sceneCompleted[scene] = false; // Initially set all to false
        }
        return sceneCompleted;
    }
 
    triggerDialogue(logic) {
        // Scene progression order
        const sceneOrder = [
            "verdantHeartlands",        // Intro Scene
            "templeEternalDawn",        // Light God's Domain
            "thunderpeakMountains",     // Meet Karzak
            "earthheartForge",          // Meet Elara
            "whisperingWoods",          // Uncover Hidden Truths
            "nightmareSpire",           // Confront Malachar
            "restoredGoldenCity"        // Final Choice
        ];
    
        // Determine which scene should trigger based on score progression
        for (let i = 0; i < sceneOrder.length; i++) {
            let requiredScore = (i / sceneOrder.length) * logic.maxScore;
    
            if (logic.player.score >= requiredScore && !this.isSceneCompleted[sceneOrder[i]]) {
                this.isPaused = true;
                this.switchDialog(sceneOrder[i]);
                this.isSceneCompleted[sceneOrder[i]] = true; // Mark scene as completed
                return; // Exit after triggering one dialogue
            }
        }
    
        // Trigger the ending dialogue
        if (logic.player.isGameOver) {
            this.switchDialog(logic.player.score >= logic.maxScore ? "win" : "abyssalRift");
        }
    }
    
    

    showDialogLine() {
        const dialogBox = document.getElementById('dialog-box');
        const dialogContent = document.getElementById('dialog-content');
    
        let playerImage = document.getElementById('player-image');
        let characterImage = document.getElementById('character-image');
    
        // 确保 main_role 始终在左侧
        if (!playerImage) {
            playerImage = new Image();
            playerImage.id = 'player-image';
            playerImage.src = 'images/portrait/main_role.webp'; // 固定 Godslayer 图片
            playerImage.alt = 'Godslayer';
            playerImage.style.position = 'absolute';
            playerImage.style.left = this.canvas.width * 0.01 + 'px';  // 左侧对齐
            playerImage.style.bottom = this.canvas.height * 0.1 + 'px'; // 底部对齐
            playerImage.style.width = this.canvas.width * 0.3 + 'px'; 
            playerImage.style.height = 'auto';
            playerImage.style.opacity = "0.3"; // 默认淡化
            document.body.appendChild(playerImage);
        }
    
        // 确保 canvas 具有相对定位，防止错位
        if (!this.canvas.style.position) {
            this.canvas.style.position = 'relative';
        }
    
        // 检查当前对话场景是否存在
        if (!this.dialogScenes[this.currentScene]) {
            console.error("❌ Current dialogue scene does not exist:", this.currentScene);
            return;
        }
    
        let dialogLines = this.dialogScenes[this.currentScene]; // 获取当前场景的对话数组
    
        if (this.currentLineIndex < dialogLines.length) {
            // 读取当前对话内容
            const { speaker, text } = dialogLines[this.currentLineIndex];
            
            // 获取下一句话的角色（如果有）
            let nextSpeaker = this.currentLineIndex + 1 < dialogLines.length ? 
                              dialogLines[this.currentLineIndex + 1].speaker : null;
            // 更新对话框文本
            dialogContent.innerHTML = '';
            const textNode = document.createElement('span');
            textNode.textContent = text;
            dialogContent.appendChild(textNode);
    
            // 确保 Godslayer 只出现在左侧
            if (speaker == 'Godslayer') {
                // Godslayer 说话时
                playerImage.style.opacity = "1";  // 高亮左侧 Godslayer
                
                // 如果有下一句，并且下一句的角色不是 Godslayer，则右侧加载该角色
                if (nextSpeaker) {
                    let nextSpeakerImagePath = `images/portrait/${nextSpeaker}.webp`;
                    // 如果右侧角色图像未创建或需要更换
                    if (!characterImage || characterImage.alt !== nextSpeaker) {
                        if (characterImage) characterImage.remove(); // 移除旧图片
                        
                        characterImage = new Image();
                        characterImage.id = 'character-image';
                        characterImage.src = nextSpeakerImagePath;
                        characterImage.alt = nextSpeaker;
                        characterImage.style.position = 'absolute';
                        characterImage.style.right = this.canvas.width * 0.01 + 'px'; // 右侧对齐
                        characterImage.style.bottom = this.canvas.height * 0.1 + 'px'; // 底部对齐
                        characterImage.style.width = this.canvas.width * 0.3 + 'px';
                        characterImage.style.height = 'auto';
                        characterImage.style.opacity = "0.3"; // 低亮度显示下一个角色
                        document.body.appendChild(characterImage);
                    } else {
                        characterImage.style.opacity = "0.3"; // 确保低亮度
                    }
                } else {
                    // 如果没有合适的下一句角色，移除右侧角色
                    if (characterImage) characterImage.remove();
                }
            } 
            // 非 Godslayer 角色说话
            else {
                playerImage.style.opacity = "0.3"; // Godslayer 变暗
                
                // 确保当前说话的角色不是 Godslayer
                if (speaker !== 'Godslayer') {
                    let speakerImagePath = `images/portrait/${speaker}.webp`;
                    
                    // 如果右侧角色图像未创建或需要更换
                    if (!characterImage || characterImage.alt !== speaker) {
                        if (characterImage) characterImage.remove(); // 移除旧图片
                        
                        characterImage = new Image();
                        characterImage.id = 'character-image';
                        characterImage.src = speakerImagePath;
                        characterImage.alt = speaker;
                        characterImage.style.position = 'absolute';
                        characterImage.style.right = this.canvas.width * 0.01 + 'px'; // 右侧对齐
                        characterImage.style.bottom = this.canvas.height * 0.1 + 'px'; // 底部对齐
                        characterImage.style.width = this.canvas.width * 0.3 + 'px';
                        characterImage.style.height = 'auto';
                        characterImage.style.opacity = "1"; // 高亮当前角色
                        document.body.appendChild(characterImage);
                    } else {
                        characterImage.style.opacity = "1"; // 高亮当前角色
                    }
                } else {
                    // 如果 Godslayer 在非主角位置说话（这是不应该发生的情况）
                    console.error("❌ Godslayer 出现在错误的位置");
                    if (characterImage) characterImage.remove();
                }
            }
    
            // 显示对话框
            dialogBox.style.display = 'block';
            this.currentLineIndex++;
    
        } else {
            // 对话结束，隐藏对话框
            dialogBox.style.display = 'none';
            this.isPaused = false;
    
            // 移除角色图像
            if (playerImage) playerImage.remove();
            if (characterImage) characterImage.remove();
        }
    }

}
