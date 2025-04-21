```markdown
# Gameplay Logic Enhancements for "Dragon Slayer: The Rise of the Forgotten Kingdom"

## Scene: Attack on Oakvale
### Custom Mechanics:
- **Dragon Telepathy Interruption**: When Aria first discovers her ability, the player can use a special telepathy ability to temporarily confuse the attacking dragon, causing it to hesitate and miss its attacks.
- **Protect Villagers**: Players can attempt to save villagers by guiding them to safety zones, adding a rescue mission element to the scene.

### Integration Notes:
- Implement a new `telepathy` method in `Player` class that triggers a confusion status in nearby enemies.
- Add a `Villager` class with properties similar to `Player`, including a method for moving towards the nearest safe zone.

### Example Code Snippets:
```javascript
class Player extends GameEntity {
  telepathy() {
    this.enemies.forEach(enemy => {
      if (this.distanceTo(enemy) < 50) {
        enemy.confused = true;
        setTimeout(() => enemy.confused = false, 3000);
      }
    });
  }
}

class Villager extends GameEntity {
  moveToSafeZone() {
    // logic to move towards the nearest safe zone
  }
}
```

## Scene: Eldoria Ruins
### Custom Mechanics:
- **Magic Echoes**: Aria can activate ancient runes to reveal hidden paths or temporary boosts.
- **Rune Puzzle**: Solving rune puzzles can alter the environment, such as lowering bridges or opening new areas.

### Integration Notes:
- Extend the `Background` class to include interactive objects that can be triggered by the player.
- Use the `DialogueSystem` to provide hints about puzzle solutions based on the dialogue with Cyrus.

### Example Code Snippets:
```javascript
class Background {
  constructor() {
    this.interactiveObjects = [{type: 'rune', position: {x: 100, y: 200}, activated: false}];
  }

  activateRune(x, y) {
    let rune = this.interactiveObjects.find(obj => obj.type === 'rune' && obj.position.x === x && obj.position.y === y);
    if (rune) {
      rune.activated = true;
      // logic to reveal paths or create effects
    }
  }
}
```

## Scene: Ironhold City Gates
### Custom Mechanics:
- **Persuasion Challenge**: Use a dialogue-based mini-game where Aria must choose the right arguments to persuade the guards to let them in.
- **Show of Power**: Demonstrate magical abilities or combat skills to impress and persuade the guards.

### Integration Notes:
- Adapt the `DialogueSystem` to include branching choices that affect the outcome of the interaction.
- Introduce a mini-game mechanic where player performance in a demonstration affects dialogue outcomes.

### Example Code Snippets:
```javascript
class DialogueSystem {
  startPersuasionChallenge() {
    this.showDialogueOptions(["Use logic", "Show magical power", "Intimidate"]);
    this.onOptionSelected = option => {
      if (option === "Show magical power") {
        player.performMagic();
        this.advanceToSuccessDialogue();
      } else {
        this.advanceToFailureDialogue();
      }
    };
  }
}
```

These enhancements are designed to enrich the gameplay experience by integrating new mechanics that fit within the existing game structure and storyline. Each scene has been given special attention to ensure that the mechanics are both engaging and relevant to the narrative.
```