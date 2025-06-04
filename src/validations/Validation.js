const WORLD_SIZE = 20;

export const isValidPosition = (pos) => {
  return pos.x >= 0 && pos.x < WORLD_SIZE && 
         pos.y >= 0 && pos.y < WORLD_SIZE;
};

export const calculateDistance = (a, b) => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

export const validateGameState = (state) => {
  if (!state.player || !state.items || !state.environment) {
    throw new Error("Invalid game state structure");
  }
  
  if (state.player.health < 0 || state.player.health > state.player.maxHealth) {
    throw new Error("Player health out of bounds");
  }
  
  state.player.inventory.forEach(itemId => {
    if (!state.items[itemId]) {
      throw new Error(`Inventory contains invalid item ID: ${itemId}`);
    }
  });
  
  return state;
};