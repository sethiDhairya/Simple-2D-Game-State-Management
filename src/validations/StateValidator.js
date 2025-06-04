export class StateValidator {
  static validateState(state) {
    const errors = [];

    if (state.player.health < 0) errors.push('Player health cannot be negative');
    if (state.player.health > state.player.maxHealth) {
      errors.push(`Player health exceeds maximum (${state.player.maxHealth})`);
    }

    for (const itemId in state.items) {
      const item = state.items[itemId];
      if (item.collected && !state.player.inventory.includes(itemId)) {
        errors.push(`Item ${itemId} marked collected but not in inventory`);
      }
    }

    state.player.inventory.forEach(itemId => {
      if (!state.items[itemId]) {
        errors.push(`Inventory contains invalid item: ${itemId}`);
      } else if (!state.items[itemId].collected) {
        errors.push(`Inventory item ${itemId} not marked as collected`);
      }
    });

    for (const objId in state.environment) {
      const obj = state.environment[objId];
      
      if (obj.type === 'door' && obj.state === 'locked' && !obj.requiredItem) {
        errors.push(`Locked door ${objId} missing requiredItem property`);
      }
      
      if (obj.type === 'portal') {
        if (!obj.linkedId) {
          errors.push(`Portal ${objId} missing linkedId property`);
        } else if (!state.environment[obj.linkedId]) {
          errors.push(`Portal ${objId} links to non-existent portal ${obj.linkedId}`);
        }
      }
    }

    return errors;
  }

  static checkPositionSanity(state) {
    const WORLD_SIZE = 20;
    return (
      state.player.position.x >= 0 &&
      state.player.position.x < WORLD_SIZE &&
      state.player.position.y >= 0 &&
      state.player.position.y < WORLD_SIZE
    );
  }
}