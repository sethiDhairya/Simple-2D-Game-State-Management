import { INITIAL_STATE } from '../InitialState.js';

export class GameInitializer {
  constructor(customInitialState) {
    this.initialState = customInitialState || INITIAL_STATE;
  }

  createNewGame() {
    return new GameStateManager({ ...this.initialState });
  }

  resetGame(manager) {
    manager.dispatch({ type: 'RESET_STATE' });
  }

  applyDifficultySettings(manager, difficulty) {
    const player = manager.getCurrentState().player;
    
    switch (difficulty) {
      case 'easy':
        manager.dispatch({ type: 'APPLY_HEALING', amount: player.maxHealth });
        break;
      case 'hard':
        manager.dispatch({ type: 'APPLY_DAMAGE', amount: player.maxHealth * 0.5 });
        break;
    }
  }
}