import { GameStateManager } from './../GameStateManager';

export class PlayerActions {
    static moveTo(position) {
        GameStateManager.dispatch({
            type: 'MOVE_PLAYER',
            payload: { position }
        });
    }

    static pickUp(itemId) {
        GameStateManager.dispatch({
            type: 'PICKUP_ITEM',
            payload: { itemId }
        });
    }

    static use(itemId) {
        GameStateManager.dispatch({
            type: 'USE_ITEM',
            payload: { itemId }
        });
    }

    static interact(objectId) {
        GameStateManager.dispatch({
            type: 'INTERACT',
            payload: { objectId }
        });
    }

    static receiveDamage(amount) {
        GameStateManager.dispatch({
            type: 'APPLY_DAMAGE',
            payload: { amount }
        });
    }

    static restoreHealth(amount) {
        GameStateManager.dispatch({
            type: 'APPLY_HEALING',
            payload: { amount }
        });
    }
}
