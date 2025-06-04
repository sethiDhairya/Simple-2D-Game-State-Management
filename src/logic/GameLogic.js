export class GameLogic {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  canPlayerInteractWith(objectId) {
    const state = this.stateManager.getCurrentState();
    const obj = state.environment[objectId];
    if (!obj) return false;

    const dx = obj.position.x - state.player.position.x;
    const dy = obj.position.y - state.player.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= 2.0;
  }

  isItemInInventory(itemId) {
    return this.stateManager.getCurrentState().player.inventory.includes(itemId);
  }

  unlockDoor(doorId) {
    const door = this.stateManager.getCurrentState().environment[doorId];
    if (!door || door.type !== 'door') return false;

    if (door.state === 'locked' && door.requiredItem) {
      if (this.isItemInInventory(door.requiredItem)) {
        this.stateManager.dispatch({ type: 'INTERACT', objectId: doorId });
        return true;
      }
    }
    return false;
  }

  autoHealPlayer() {
    const state = this.stateManager.getCurrentState();
    const player = state.player;
    
    if (player.health >= player.maxHealth * 0.5) return;
    
    const healthPotionId = player.inventory.find(id => 
      state.items[id]?.type === 'health-potion'
    );
    
    if (healthPotionId) {
      this.stateManager.dispatch({ type: 'USE_ITEM', itemId: healthPotionId });
    }
  }

  findNearestItem(type) {
    const state = this.stateManager.getCurrentState();
    let nearestItemId = null;
    let minDistance = Infinity;

    for (const itemId in state.items) {
      const item = state.items[itemId];
      
      if (item.collected) continue;
      if (type && item.type !== type) continue;
      
      const distance = Math.sqrt(
        Math.pow(item.position.x - state.player.position.x, 2) +
        Math.pow(item.position.y - state.player.position.y, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestItemId = itemId;
      }
    }
    
    return nearestItemId;
  }
}