
/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Player
 * @property {Position} position
 * @property {number} health
 * @property {number} maxHealth
 * @property {string[]} inventory
 */

/**
 * @typedef {'health-potion' | 'key' | 'weapon'} ItemType
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {Position} position
 * @property {ItemType} type
 * @property {number} [value]
 * @property {boolean} [collected]
 */

/**
 * @typedef {'door' | 'chest' | 'lever' | 'portal'} EnvironmentObjectType
 * @typedef {'open' | 'closed' | 'locked' | 'active'} EnvironmentObjectState
 */

/**
 * @typedef {Object} EnvironmentObject
 * @property {string} id
 * @property {EnvironmentObjectType} type
 * @property {EnvironmentObjectState} state
 * @property {Position} position
 * @property {string} [requiredItem]
 * @property {string} [linkedId]
 */

/**
 * @typedef {Object} GameState
 * @property {Player} player
 * @property {Record<string, Item>} items
 * @property {Record<string, EnvironmentObject>} environment
 */

/**
 * @typedef {Object} MovePlayerAction
 * @property {'MOVE_PLAYER'} type
 * @property {Position} position
 */

/**
 * @typedef {Object} PickupItemAction
 * @property {'PICKUP_ITEM'} type
 * @property {string} itemId
 */

/**
 * @typedef {Object} UseItemAction
 * @property {'USE_ITEM'} type
 * @property {string} itemId
 */

/**
 * @typedef {Object} InteractAction
 * @property {'INTERACT'} type
 * @property {string} objectId
 */

/**
 * @typedef {Object} ApplyDamageAction
 * @property {'APPLY_DAMAGE'} type
 * @property {number} amount
 */

/**
 * @typedef {Object} ApplyHealingAction
 * @property {'APPLY_HEALING'} type
 * @property {number} amount
 */

/**
 * @typedef {Object} ResetStateAction
 * @property {'RESET_STATE'} type
 */

/**
 * @typedef {Object} LoadStateAction
 * @property {'LOAD_STATE'} type
 * @property {GameState} state
 */

/**
 * @typedef {
 *   MovePlayerAction |
 *   PickupItemAction |
 *   UseItemAction |
 *   InteractAction |
 *   ApplyDamageAction |
 *   ApplyHealingAction |
 *   ResetStateAction |
 *   LoadStateAction
 * } GameAction
 */