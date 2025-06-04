export const INITIAL_STATE = {
  player: {
    position: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    inventory: [],
  },
  items: {
    "potion1": {
      id: "potion1",
      position: { x: 5, y: 3 },
      type: "health-potion",
      value: 20
    },
    "key1": {
      id: "key1",
      position: { x: 8, y: 2 },
      type: "key",
    },
    "weapon1": {
      id: "weapon1",
      position: { x: 12, y: 7 },
      type: "weapon",
      value: 15
    }
  },
  environment: {
    "door1": {
      id: "door1",
      position: { x: 10, y: 0 },
      type: "door",
      state: "locked",
      requiredItem: "key1"
    },
    "chest1": {
      id: "chest1",
      position: { x: 7, y: 4 },
      type: "chest",
      state: "closed"
    },
    "portal1": {
      id: "portal1",
      position: { x: 15, y: 5 },
      type: "portal",
      state: "active",
      linkedId: "portal2"
    },
    "portal2": {
      id: "portal2",
      position: { x: 3, y: 8 },
      type: "portal",
      state: "active",
      linkedId: "portal1"
    }
  }
};