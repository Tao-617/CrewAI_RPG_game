export class DialogueSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentScene = "start";
    }

    // **🚀 Switch dialogue and background**
    switchDialog(sceneName) {
        if (dialogScenes[sceneName] && !this.isSceneCompleted[sceneName]) {
            this.currentScene = sceneName;
            this.switchBackground(sceneName); // **Change background when dialogue occurs**
            this.currentLineIndex = 0;
            this.isSceneCompleted[sceneName] = true;
            this.showDialogLine();
        }
    }

    initializeSceneCompletion(dialogScenes) {
        let sceneCompleted = {};
        for (let scene in dialogScenes) {
            sceneCompleted[scene] = false; // Initially set all to false
        }
        return sceneCompleted;
    }

    showDialogLine() {
        const dialogBox = document.getElementById('dialog-box');
        const dialogContent = document.getElementById('dialog-content');

        let playerImage = document.getElementById('player-image');
        let enemyImage = document.getElementById('enemy-image');

        // **Create player (left-side character)**
        if (!playerImage) {
            playerImage = new Image();
            playerImage.id = 'player-image';
            playerImage.src = 'images/player.png';
            playerImage.alt = 'Player';
            playerImage.style.position = 'absolute';
            playerImage.style.left = this.canvas.width * 0.01 + 'px';  // **Left-side 5% position**
            playerImage.style.bottom = this.canvas.height * 0.1 + 'px'; // **Bottom 10%**
            playerImage.style.width = this.canvas.width * 0.3 + 'px'; // **10% canvas width**
            playerImage.style.height = 'auto';
            document.body.appendChild(playerImage);
        }

        // **Create enemy (right-side character)**
        if (!enemyImage) {
            enemyImage = new Image();
            enemyImage.id = 'enemy-image';
            enemyImage.src = 'images/boss.png';
            enemyImage.alt = 'Enemy';
            enemyImage.style.position = 'absolute';
            enemyImage.style.right = this.canvas.width * 0.01 + 'px';  // **Right-side 5% position**
            enemyImage.style.bottom = this.canvas.height * 0.1 + 'px'; // **Bottom 10%**
            enemyImage.style.width = this.canvas.width * 0.3 + 'px'; // **10% canvas width**
            enemyImage.style.height = 'auto';
            document.body.appendChild(enemyImage);
        }
        
        // **Ensure the canvas is relatively positioned to prevent misalignment**
        if (!this.canvas.style.position) {
            this.canvas.style.position = 'relative';
        }

        // **Check if the current dialogue scene exists**
        if (!this.dialogScenes[this.currentScene]) {
            console.error("❌ Current dialogue scene does not exist:", this.currentScene);
            return;
        }

        let dialogLines = this.dialogScenes[this.currentScene]; // Retrieve the current dialogue lines

        if (this.currentLineIndex < dialogLines.length) {
            // **Read the current dialogue line**
            const { speaker, text } = dialogLines[this.currentLineIndex];

            // **Clear the dialogue box and update text**
            dialogContent.innerHTML = '';
            const textNode = document.createElement('span');
            textNode.textContent = text;
            dialogContent.appendChild(textNode);

            // **Switch character highlight**
            if (speaker === 'player') {
                playerImage.style.opacity = "1";   // Highlight player
                enemyImage.style.opacity = "0.3"; // Dim enemy
            } else {
                playerImage.style.opacity = "0.3"; // Dim player
                enemyImage.style.opacity = "1";   // Highlight enemy
            }

            // **Show dialogue box**
            dialogBox.style.display = 'block';
            this.currentLineIndex++;

        } else {
            // **End of dialogue, hide dialogue box**
            dialogBox.style.display = 'none';
            this.isPaused = false;
            // **Remove character images**
            if (playerImage) playerImage.remove();
            if (enemyImage) enemyImage.remove();
        }
    }

}
