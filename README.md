# 🕹️ Game State Management System

A flexible game state management library for JavaScript games. Handles player data, world items, and interactive objects with straightforward APIs and debugging tools.

---

## 📐 Game State Architecture

The core state object organizes game data into three main areas:

- **Player**: Position, health, inventory tracking
- **Items**: World objects with location and collection state  
- **Environment**: Interactive elements like doors, chests, switches

### Why Use Object Maps?
Object maps provide O(1) lookups by ID, making it easy to add/remove game objects dynamically. They also serialize cleanly to JSON for save files.

### Basic Structure
```javascript
{
  player: {
    position: { x: 5, y: 3 },
    health: 100,
    inventory: ["potion1"]
  },
  items: {
    "potion1": {
      position: { x: 5, y: 3 },
      type: "health-potion",
      collected: true
    }
  },
  environment: {
    "door1": {
      type: "door",
      state: "locked"
    }
  }
}
```

## 🔄 State Updates

All state changes go through controlled functions that validate input, update data, and notify other systems.

### Core Functions

- `movePlayer(x, y)` - Move player with bounds checking
- `pickupItem(itemId)` - Add item to inventory
- `useItem(itemId)` - Consume or activate items
- `interactWithEnvironment(envId)` - Trigger environment actions

### How It Works
```javascript
gameManager.movePlayer(10, 5);

// Internally:
// 1. Check if (10, 5) is valid
// 2. Update player position
// 3. Trigger any position-based events
```

## 🛡️ Error Handling

Common edge cases are handled gracefully to prevent crashes:

| Problem | Solution |
|---------|----------|
| Out of bounds movement | Clamp to valid coordinates |
| Missing item pickup | Check existence before action |
| Invalid item usage | Verify item is in inventory |
| Corrupted save data | Fallback to default state |
| Negative health | Clamp to zero minimum |
| Duplicate IDs | Prevent during object creation |

## 🔧 Adding New Features

The modular design makes it straightforward to extend functionality:

- **Plugin architecture**: New features don't require core changes
- **Event-driven**: Other systems can react to state changes
- **Type flexibility**: Support new item/environment types easily
- **Action pattern**: Add new player actions with minimal code

### Example: NPCs

Add NPCs to your game state:

```javascript
{
  // existing state...
  npcs: {
    "village_elder": {
      name: "Elder Thorne",
      dialogue: ["Welcome, traveler.", "The path ahead is dangerous."],
      position: { x: 12, y: 8 }
    }
  }
}
```

Then create an interaction function:

```javascript
function speakWith(npcId) {
  const npc = gameState.npcs[npcId];
  if (npc) {
    return npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
  }
}
```

## 📋 Current Limitations

- World size: 20x20 grid
- Interaction range: 2 units
- Inventory: Unlimited capacity
- Items: Cannot be dropped once collected
- Players: Single player only

## 🚀 Scaling Up

For larger games, consider these extensions:

- Quest and dialogue systems
- Spatial indexing for performance
- Save file versioning
- Integration with game engines
- Undo/redo functionality

### Game Loop Integration
```javascript
function gameLoop() {
  if (input.isPressed('E')) {
    const nearby = findNearbyItems(player.position, 2);
    if (nearby.length > 0) {
      gameManager.pickupItem(nearby[0].id);
    }
  }
  renderer.draw(gameManager.getState());
}
```

## ⚙️ Getting Started

### Requirements

- Node.js (any recent version)
- Text editor or IDE

### Project Setup

1. Create your project directory
2. Add a `src/` folder for your game files
3. Create `package.json`:

```json
{
  "type": "module"
}
```

### Running Your Game

```bash
cd your-game-project
node src/main.js
```

## 🧪 Testing Features

### Player Movement
```javascript
player.moveTo(5, 3);
console.log("Player at:", gameState.player.position);
```

### Item Collection
```javascript
player.collectItem('health_potion');
console.log("Inventory:", gameState.player.inventory);
```

### Save System
```javascript
saveManager.writeToFile();
console.log("Game saved successfully");
```

### Error Testing
```javascript
try {
  player.moveTo(-10, 50); // Invalid coordinates
} catch (err) {
  console.log("Movement blocked:", err.message);
}
```

## 📊 Expected Console Output

```
Player at: {x: 5, y: 3}
Inventory: ['health_potion']
Game saved successfully
Movement blocked: Position (-10, 50) is out of bounds
```

## 🗺️ Debug Visualization

Add visual debugging to see your game world:

```javascript
gameState.onChange(state => {
  WorldRenderer.drawASCII(state, 10);
});
```

Sample output:
```
· · · · · · ·
· · · D · · ·
· I · · · · ·
· · P · C · ·
· · · · · · ·
```

Legend:
- `P` Player location
- `I` Available item
- `D` Door (environment)
- `C` Chest (environment)
- `·` Empty space
