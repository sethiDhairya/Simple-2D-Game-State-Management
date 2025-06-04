export class StateDebugger {
  static printStateSummary(state) {
    console.log('--- GAME STATE SUMMARY ---');
    console.log(`Player: [HP: ${state.player.health}/${state.player.maxHealth}]`);
    console.log(`Position: (${state.player.position.x}, ${state.player.position.y})`);
    console.log(`Inventory: [${state.player.inventory.join(', ')}]`);
    
    console.log('\nItems:');
    for (const itemId in state.items) {
      const item = state.items[itemId];
      console.log(`- ${item.id}: ${item.type} at (${item.position.x}, ${item.position.y}) ${
        item.collected ? '(Collected)' : ''
      }`);
    }
    
    console.log('\nEnvironment Objects:');
    for (const objId in state.environment) {
      const obj = state.environment[objId];
      console.log(`- ${obj.id}: ${obj.type} [${obj.state}] at (${obj.position.x}, ${obj.position.y})`);
    }
  }

  static visualizeWorld(state, size = 10) {
    console.log('\n--- WORLD MAP ---');
    const grid = Array(size).fill(null).map(() => Array(size).fill('·'));
    
    const playerPos = state.player.position;
    if (playerPos.x < size && playerPos.y < size) {
      grid[Math.floor(playerPos.y)][Math.floor(playerPos.x)] = 'P';
    }
    
    for (const itemId in state.items) {
      const item = state.items[itemId];
      if (!item.collected && item.position.x < size && item.position.y < size) {
        grid[Math.floor(item.position.y)][Math.floor(item.position.x)] = 'I';
      }
    }
    
    for (const objId in state.environment) {
      const obj = state.environment[objId];
      if (obj.position.x < size && obj.position.y < size) {
        const symbol = 
          obj.type === 'door' ? 'D' : 
          obj.type === 'chest' ? 'C' : 
          obj.type === 'portal' ? 'O' : 'L';
          
        grid[Math.floor(obj.position.y)][Math.floor(obj.position.x)] = symbol;
      }
    }
    
    for (let y = 0; y < size; y++) {
      console.log(grid[y].join(' '));
    }
  }
}