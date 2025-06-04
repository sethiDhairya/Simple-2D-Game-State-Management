import { INITIAL_STATE } from './InitialState.js';
import { isValidPosition, calculateDistance, validateGameState } from './validation.js';

const MAX_INTERACT_DISTANCE = 2.0;

export class GameStateManager {
  constructor(initialState = INITIAL_STATE) {
    this.state = { ...initialState };
    this.subscribers = [];
  }

  getCurrentState() {
    return { ...this.state };
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }
  
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  dispatch(action) {
    switch (action.type) {
      case 'MOVE_PLAYER':
        this.movePlayer(action.position);
        break;
      case 'PICKUP_ITEM':
        this.pickupItem(action.itemId);
        break;
      case 'USE_ITEM':
        this.useItem(action.itemId);
        break;
      case 'INTERACT':
        this.interactWithEnvironment(action.objectId);
        break;
      case 'APPLY_DAMAGE':
        this.applyDamage(action.amount);
        break;
      case 'APPLY_HEALING':
        this.applyHealing(action.amount);
        break;
      case 'RESET_STATE':
        this.resetGame();
        break;
      case 'LOAD_STATE':
        this.loadState(action.state);
        break;
    }
    this.notifySubscribers();
  }
  
  movePlayer(position) {
    if (!isValidPosition(position)) {
      throw new Error(`Invalid position: (${position.x}, ${position.y})`);
    }
    this.state.player.position = position;
  }

  pickupItem(itemId) {
    const item = this.state.items[itemId];
    
    if (!item) {
      throw new Error(`Item ${itemId} does not exist`);
    }
    
    if (item.collected) {
      throw new Error(`Item ${itemId} already collected`);
    }
    
    const distance = calculateDistance(this.state.player.position, item.position);
    
    if (distance > MAX_INTERACT_DISTANCE) {
      throw new Error(`Too far to pick up item ${itemId}`);
    }
    
    this.state.player.inventory.push(itemId);
    item.collected = true;
  }

  useItem(itemId) {
    const itemIndex = this.state.player.inventory.indexOf(itemId);
    
    if (itemIndex === -1) {
      throw new Error(`Item ${itemId} not in inventory`);
    }
    
    const item = this.state.items[itemId];
    
    switch (item.type) {
      case 'health-potion':
        this.state.player.health = Math.min(
          this.state.player.maxHealth,
          this.state.player.health + (item.value || 20)
        );
        break;
      case 'weapon':
        console.log(`Used weapon: ${itemId}`);
        break;
    }
    
    this.state.player.inventory.splice(itemIndex, 1);
  }

  interactWithEnvironment(objectId) {
    const obj = this.state.environment[objectId];
    
    if (!obj) {
      throw new Error(`Environment object ${objectId} not found`);
    }
    
    const distance = calculateDistance(this.state.player.position, obj.position);
    
    if (distance > MAX_INTERACT_DISTANCE) {
      throw new Error(`Too far to interact with ${objectId}`);
    }
    
    switch (obj.type) {
      case 'door':
        this.handleDoorInteraction(obj);
        break;
      case 'chest':
        this.handleChestInteraction(obj);
        break;
      case 'lever':
        obj.state = obj.state === 'active' ? 'inactive' : 'active';
        break;
      case 'portal':
        this.handlePortalInteraction(obj);
        break;
    }
  }
  
  handleDoorInteraction(door) {
    switch (door.state) {
      case 'locked':
        if (door.requiredItem && this.state.player.inventory.includes(door.requiredItem)) {
          door.state = 'closed';
        } else {
          throw new Error('Door is locked. Missing required key.');
        }
        break;
      case 'closed':
        door.state = 'open';
        break;
      case 'open':
        door.state = 'closed';
        break;
    }
  }
  
  handleChestInteraction(chest) {
    if (chest.state === 'closed') {
      chest.state = 'open';
    }
  }
  
  handlePortalInteraction(portal) {
    if (!portal.linkedId) return;
    
    const targetPortal = this.state.environment[portal.linkedId];
    if (!targetPortal) return;
    
    this.state.player.position = { ...targetPortal.position };
  }

  applyDamage(amount) {
    this.state.player.health = Math.max(0, this.state.player.health - amount);
  }

  applyHealing(amount) {
    this.state.player.health = Math.min(
      this.state.player.maxHealth,
      this.state.player.health + amount
    );
  }
  
  resetGame() {
    this.state = { ...INITIAL_STATE };
  }
  
  loadState(state) {
    this.state = validateGameState(state);
  }
  
  saveState() {
    return JSON.stringify(this.state);
  }
  
  loadFromJSON(json) {
    try {
      const parsed = JSON.parse(json);
      this.state = validateGameState(parsed);
      this.notifySubscribers();
    } catch (error) {
      throw new Error(`Failed to load game state: ${error.message}`);
    }
  }
}