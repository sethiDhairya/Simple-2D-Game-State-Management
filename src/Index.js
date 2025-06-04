import { GameStateManager } from './GameStateManager.js';
import { PlayerActions } from './actions/PlayerActions.js';
import { StateSerializer } from './persistence/StateSerializer.js';
import { StateDebugger } from './utils/StateDebugger.js';
import { GameInitializer } from './core/GameInitializer.js';
import { GameLogic } from './logic/GameLogic.js';

// Bootstrapping core modules
const boot = new GameInitializer();
const stateCtrl = new GameStateManager();
const player = new PlayerActions(stateCtrl);
const persist = new StateSerializer(stateCtrl);
const logic = new GameLogic(stateCtrl);

// Listen for state mutations
stateCtrl.subscribe(updated => {
    console.log('State changed:', updated);
});

try {
    // Initial state overview
    StateDebugger.printStateSummary(stateCtrl.getCurrentState());
    StateDebugger.visualizeWorld(stateCtrl.getCurrentState(), 15);

    // Simulate player journey
    player.moveTo({ x: 5, y: 3 });
    player.pickupItem('potion1');
    player.moveTo({ x: 8, y: 2 });
    player.pickupItem('key1');
    player.moveTo({ x: 10, y: 0 });
    player.interactWith('door1');
    player.interactWith('door1');
    player.useItem('potion1');

    // Persist state
    persist.saveToLocalStorage();

    // Logic demonstration
    const closest = logic.findNearestItem();
    console.log('Closest item:', closest);

    // Reset and restore
    boot.resetGame(stateCtrl);
    persist.loadFromLocalStorage();

    // Final state overview
    StateDebugger.printStateSummary(stateCtrl.getCurrentState());
} catch (err) {
    console.error('Game Exception:', err.message);
}
